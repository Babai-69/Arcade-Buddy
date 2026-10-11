import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageSEO, PageSEOMeta } from '../data/pageSEO';

interface SEOProps {
  customSEO?: Partial<PageSEOMeta>;
}

function updateMetaTag(attributeName: string, attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function generateBreadcrumbs(pathname: string, origin: string) {
  if (pathname === '/' || !pathname) return null;

  const parts = pathname.split('/').filter(Boolean);
  let currentPath = '';
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${origin}/`
    }
  ];

  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    const formattedName = part
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    itemListElement.push({
      '@type': 'ListItem',
      position: index + 2,
      name: formattedName,
      item: `${origin}${currentPath}`
    });
  });

  return {
    '@type': 'BreadcrumbList',
    itemListElement
  };
}

function updateJsonLd(schema: Record<string, any> | undefined) {
  const existingScript = document.getElementById('arcade-buddy-ld-json');
  if (existingScript) {
    existingScript.remove();
  }

  if (schema) {
    const script = document.createElement('script');
    script.id = 'arcade-buddy-ld-json';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }
}

export function SEO({ customSEO }: SEOProps = {}) {
  const location = useLocation();

  useEffect(() => {
    const baseSEO = getPageSEO(location.pathname);
    const seo: PageSEOMeta = {
      ...baseSEO,
      ...customSEO
    };

    // 1. Page Title
    document.title = seo.title;

    // Absolute URLs for Open Graph
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined'
      ? `${origin}${location.pathname}`
      : `https://ais-dev-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app${location.pathname}`;

    const imageUrl = seo.image.startsWith('http')
      ? seo.image
      : `${origin}${seo.image.startsWith('/') ? '' : '/'}${seo.image}`;

    // 2. Standard Meta Description
    updateMetaTag('name', 'description', seo.description);
    if (seo.keywords && seo.keywords.length > 0) {
      updateMetaTag('name', 'keywords', seo.keywords.join(', '));
    }

    // 3. OpenGraph Social Cards
    updateMetaTag('property', 'og:title', seo.title);
    updateMetaTag('property', 'og:description', seo.description);
    updateMetaTag('property', 'og:image', imageUrl);
    updateMetaTag('property', 'og:image:alt', seo.imageAlt);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', seo.type || 'website');
    updateMetaTag('property', 'og:site_name', 'Arcade Buddy');

    // 4. Twitter / X Cards
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', seo.title);
    updateMetaTag('name', 'twitter:description', seo.description);
    updateMetaTag('name', 'twitter:image', imageUrl);
    updateMetaTag('name', 'twitter:image:alt', seo.imageAlt);

    // 5. Canonical Link
    updateLinkTag('canonical', currentUrl);

    // 6. Schema.org Structured Data (JSON-LD)
    const breadcrumbs = generateBreadcrumbs(location.pathname, origin);
    const combinedSchema = seo.schema ? (
      breadcrumbs ? {
        '@context': 'https://schema.org',
        '@graph': [
          ...(seo.schema['@graph'] ? seo.schema['@graph'] : [seo.schema]),
          breadcrumbs
        ]
      } : seo.schema
    ) : (breadcrumbs ? { '@context': 'https://schema.org', ...breadcrumbs } : undefined);

    updateJsonLd(combinedSchema);

  }, [location.pathname, customSEO]);

  return null;
}

export default SEO;
