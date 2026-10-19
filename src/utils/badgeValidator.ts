/**
 * Badge Asset and Metadata Validator Utility
 * 
 * Validates badge image URLs, titles, and links against the badges data/JSON source.
 * Identifies:
 * - Duplicate assets (duplicate names, identical image URLs assigned to different badges, duplicate URLs)
 * - Missing assets (missing image, missing link, empty names)
 * - URL validity and live HTTP accessibility check (flagging 404s, CORS issues, or broken assets)
 */

import { gameBadges, skillBadges } from '../data/badgesData';

export interface BadgeItemInput {
  name?: string;
  title?: string;
  image?: string;
  img?: string;
  link?: string;
  code?: string;
  month?: string;
  category?: string;
}

export interface ValidationIssue {
  type: 'DUPLICATE_NAME' | 'DUPLICATE_IMAGE' | 'DUPLICATE_LINK' | 'MISSING_IMAGE' | 'MISSING_LINK' | 'INVALID_URL' | 'HTTP_ERROR';
  severity: 'error' | 'warning' | 'info';
  badgeTitle: string;
  message: string;
  field: string;
  value?: string;
  conflictingWith?: string;
  statusCode?: number;
}

export interface ValidationReport {
  timestamp: string;
  totalBadgesChecked: number;
  validBadgesCount: number;
  issueCount: number;
  duplicates: {
    names: Array<{ title: string; count: number }>;
    images: Array<{ url: string; badges: string[] }>;
    links: Array<{ url: string; badges: string[] }>;
  };
  missingAssets: Array<{ title: string; missingFields: string[] }>;
  brokenUrls: Array<{ title: string; url: string; status: number | string }>;
  issues: ValidationIssue[];
  isClean: boolean;
}

/**
 * Validates a list of badges and checks for metadata completeness and duplicate assets.
 */
export function validateBadgeMetadata(
  badges: BadgeItemInput[] = gameBadges
): ValidationReport {
  const issues: ValidationIssue[] = [];
  const nameMap = new Map<string, number>();
  const imageMap = new Map<string, string[]>();
  const linkMap = new Map<string, string[]>();
  const missingAssets: Array<{ title: string; missingFields: string[] }> = [];

  badges.forEach((b, index) => {
    const title = (b.name || b.title || `Unnamed Badge #${index + 1}`).trim();
    const image = (b.image || b.img || '').trim();
    const link = (b.link || '').trim();

    const missingFields: string[] = [];

    // Check Name
    if (!title || title.startsWith('Unnamed Badge')) {
      missingFields.push('title');
      issues.push({
        type: 'MISSING_IMAGE',
        severity: 'error',
        badgeTitle: title,
        field: 'name',
        message: `Badge at index ${index} is missing a name or title.`
      });
    } else {
      const lower = title.toLowerCase();
      nameMap.set(lower, (nameMap.get(lower) || 0) + 1);
    }

    // Check Image
    if (!image) {
      missingFields.push('image');
      issues.push({
        type: 'MISSING_IMAGE',
        severity: 'error',
        badgeTitle: title,
        field: 'image',
        message: `Badge "${title}" has no image URL defined.`
      });
    } else {
      // Validate image URL format
      try {
        const parsed = new URL(image);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          issues.push({
            type: 'INVALID_URL',
            severity: 'error',
            badgeTitle: title,
            field: 'image',
            value: image,
            message: `Badge "${title}" image URL does not use HTTP/HTTPS protocol.`
          });
        }
      } catch {
        issues.push({
          type: 'INVALID_URL',
          severity: 'error',
          badgeTitle: title,
          field: 'image',
          value: image,
          message: `Badge "${title}" has an invalid image URL syntax: "${image}".`
        });
      }

      // Check for shared/duplicate image URLs across distinct badges
      const existing = imageMap.get(image) || [];
      existing.push(title);
      imageMap.set(image, existing);
    }

    // Check Link
    if (!link) {
      missingFields.push('link');
      issues.push({
        type: 'MISSING_LINK',
        severity: 'warning',
        badgeTitle: title,
        field: 'link',
        message: `Badge "${title}" has no syllabus/enrollment link.`
      });
    } else {
      const existing = linkMap.get(link) || [];
      existing.push(title);
      linkMap.set(link, existing);
    }

    if (missingFields.length > 0) {
      missingAssets.push({ title, missingFields });
    }
  });

  // Extract Duplicate Names
  const duplicateNames: Array<{ title: string; count: number }> = [];
  nameMap.forEach((count, name) => {
    if (count > 1) {
      duplicateNames.push({ title: name, count });
      issues.push({
        type: 'DUPLICATE_NAME',
        severity: 'error',
        badgeTitle: name,
        field: 'name',
        message: `Badge name "${name}" appears ${count} times in the dataset.`
      });
    }
  });

  // Extract Duplicate Images (crucial: catches when distinct badges share the exact same asset)
  const duplicateImages: Array<{ url: string; badges: string[] }> = [];
  imageMap.forEach((badgeList, url) => {
    if (badgeList.length > 1) {
      duplicateImages.push({ url, badges: badgeList });
      issues.push({
        type: 'DUPLICATE_IMAGE',
        severity: 'warning',
        badgeTitle: badgeList.join(', '),
        field: 'image',
        value: url,
        message: `Image URL is reused across multiple badges: [${badgeList.join(', ')}]. Verify they are not sharing placeholder or stale cohort assets.`
      });
    }
  });

  // Extract Duplicate Links
  const duplicateLinks: Array<{ url: string; badges: string[] }> = [];
  linkMap.forEach((badgeList, url) => {
    if (badgeList.length > 1) {
      duplicateLinks.push({ url, badges: badgeList });
      issues.push({
        type: 'DUPLICATE_LINK',
        severity: 'warning',
        badgeTitle: badgeList.join(', '),
        field: 'link',
        value: url,
        message: `Course link is reused across multiple badges: [${badgeList.join(', ')}].`
      });
    }
  });

  const validBadgesCount = badges.length - missingAssets.length;

  return {
    timestamp: new Date().toISOString(),
    totalBadgesChecked: badges.length,
    validBadgesCount,
    issueCount: issues.length,
    duplicates: {
      names: duplicateNames,
      images: duplicateImages,
      links: duplicateLinks
    },
    missingAssets,
    brokenUrls: [],
    issues,
    isClean: issues.filter(i => i.severity === 'error').length === 0
  };
}

/**
 * Validates badge image URLs asynchronously by executing HEAD/GET requests.
 */
export async function validateBadgeImageAccessibility(
  badges: BadgeItemInput[] = gameBadges,
  timeoutMs = 6000
): Promise<Array<{ title: string; url: string; status: number | string; ok: boolean }>> {
  const results = await Promise.all(
    badges.map(async (b) => {
      const title = b.name || b.title || 'Unknown Badge';
      const url = b.image || b.img;
      if (!url) {
        return { title, url: '', status: 'MISSING', ok: false };
      }

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);
        const res = await fetch(url, {
          method: 'GET',
          signal: controller.signal,
          headers: { 
            'Accept': 'image/*',
            'Range': 'bytes=0-10'
          }
        });
        clearTimeout(timeout);
        return { title, url, status: res.status, ok: res.ok || res.status === 206 };
      } catch (err: any) {
        return { title, url, status: err.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERROR', ok: false };
      }
    })
  );

  return results;
}

/**
 * Comprehensive audit runner that combines metadata analysis and live network ping.
 */
export async function auditOctoberBadgeAssets(): Promise<ValidationReport> {
  const metadataReport = validateBadgeMetadata(gameBadges);
  
  try {
    const liveChecks = await validateBadgeImageAccessibility(gameBadges);
    const broken = liveChecks.filter(c => !c.ok);

    broken.forEach(b => {
      metadataReport.brokenUrls.push({
        title: b.title,
        url: b.url,
        status: b.status
      });
      metadataReport.issues.push({
        type: 'HTTP_ERROR',
        severity: 'error',
        badgeTitle: b.title,
        field: 'image',
        value: b.url,
        statusCode: typeof b.status === 'number' ? b.status : undefined,
        message: `Image URL returned HTTP ${b.status} or failed to respond.`
      });
    });

    metadataReport.issueCount = metadataReport.issues.length;
    metadataReport.isClean = metadataReport.issues.filter(i => i.severity === 'error').length === 0;
  } catch (e) {
    console.error('Failed to perform live HTTP checks:', e);
  }

  return metadataReport;
}
