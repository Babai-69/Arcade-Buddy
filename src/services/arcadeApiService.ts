export interface ArcadeBadge {
  id: string;
  title: string;
  earnedDate: string;
  category: 'Game' | 'Skill' | 'Lab-free' | 'Special' | 'Trivia' | 'Other';
  points: number;
  validForProgram?: boolean;
  validForArcade?: boolean;
  _debugCleanDate?: string;
  _debugParsedDate?: string | null;
  _debugStartDate?: string | null;
}

export interface ArcadeCalculatorResponse {
  name: string;
  avatarUrl: string;
  arcadePoints: number;
  gameBadges: number;
  triviaBadges: number;
  specialBadges: number;
  skillBadges: number;
  facilitatorGameBadges: number;
  facilitatorSkillBadges: number;
  milestoneEarned?: string;
  badges: ArcadeBadge[];
  error?: string;
}

export class ArcadeApiError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ArcadeApiError';
    this.status = status;
  }
}

/**
 * Pings the /health or /api/health endpoint to see if backend is running.
 */
export async function checkBackendHealth(): Promise<{ ok: boolean; status?: string }> {
  try {
    const res = await fetch('/api/health', { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return { ok: false };
    const data = await res.json();
    return { ok: true, status: data.status };
  } catch {
    return { ok: false };
  }
}

interface FetchCalculatorOptions {
  maxRetries?: number;
  retryDelayMs?: number;
  onRetry?: (attempt: number, maxRetries: number, delayMs: number) => void;
}

/**
 * Fetches arcade profile data from /api/calculator with automatic retries
 * for Render cold-starts (HTTP 502/503/504 or network drop).
 */
export async function fetchProfileCalculator(
  profileUrl: string,
  options: FetchCalculatorOptions = {}
): Promise<ArcadeCalculatorResponse> {
  const { maxRetries = 2, retryDelayMs = 3500, onRetry } = options;

  let lastError: Error | null = null;
  const targetUrl = profileUrl.trim();

  // Basic client-side validation
  if (!targetUrl.includes('skills.google/public_profiles/') && !targetUrl.includes('cloudskillsboost.google/public_profiles/')) {
    throw new ArcadeApiError(
      'Invalid URL. Please enter a valid Google Cloud Skills Boost public profile URL (https://www.skills.google/public_profiles/<id>).',
      400
    );
  }

  const endpoint = `/api/calculator?url=${encodeURIComponent(targetUrl)}`;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0 && onRetry) {
        onRetry(attempt, maxRetries, retryDelayMs);
      }

      const res = await fetch(endpoint, {
        headers: {
          Accept: 'application/json'
        }
      });

      const contentType = res.headers.get('content-type') || '';

      // Check if server returned HTML instead of JSON (e.g. index.html or 404 HTML)
      if (!contentType.includes('application/json')) {
        const rawBody = await res.text().catch(() => '');
        if (rawBody.trim().startsWith('<!doctype') || rawBody.includes('<html')) {
          const isProbablyWaking = res.status === 502 || res.status === 503 || res.status === 504;
          if (isProbablyWaking && attempt < maxRetries) {
            await new Promise(r => setTimeout(r, retryDelayMs));
            continue;
          }
          throw new ArcadeApiError(
            'Received HTML page instead of API JSON response. The backend server may still be initializing or the API rewrite is misconfigured.',
            res.status || 502
          );
        }
      }

      // Parse JSON
      let data: any;
      try {
        data = await res.json();
      } catch (parseErr: any) {
        if (attempt < maxRetries) {
          await new Promise(r => setTimeout(r, retryDelayMs));
          continue;
        }
        throw new ArcadeApiError(
          'Failed to parse JSON response from server. Please try again in a few moments.',
          500
        );
      }

      // Handle non-OK status codes
      if (!res.ok) {
        const message = data?.error || getFriendlyErrorMessage(res.status);

        // If it's a 502, 503, or 504 (cold start / temporary proxy error), retry
        if ((res.status === 502 || res.status === 503 || res.status === 504) && attempt < maxRetries) {
          await new Promise(r => setTimeout(r, retryDelayMs));
          continue;
        }

        throw new ArcadeApiError(message, res.status);
      }

      if (data.error) {
        throw new ArcadeApiError(data.error, 400);
      }

      return data as ArcadeCalculatorResponse;
    } catch (err: any) {
      lastError = err;

      // If it's a client error (e.g. 400, 404, 422), do not retry
      if (err instanceof ArcadeApiError && [400, 404, 422].includes(err.status)) {
        throw err;
      }

      // If we have retries left, wait and loop
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, retryDelayMs));
        continue;
      }

      // Out of retries
      if (err instanceof ArcadeApiError) {
        throw err;
      }

      throw new ArcadeApiError(
        err.message || 'Unable to connect to backend server. Please verify your connection or try again shortly.',
        502
      );
    }
  }

  throw lastError || new ArcadeApiError('Request failed after retrying.', 500);
}

function getFriendlyErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Invalid profile URL. Ensure the URL begins with https://www.skills.google/public_profiles/<id>.';
    case 404:
      return 'Profile not found on Google Skills Boost. Please verify your profile ID/URL.';
    case 403:
      return 'Access blocked by skills.google (HTTP 403 Forbidden). Rate-limiting or bot protection triggered.';
    case 429:
      return 'Rate-limited by skills.google (HTTP 429 Too Many Requests). Please wait a moment and try again.';
    case 422:
      return 'Profile is private. Please set your Google Cloud Skills Boost profile to Public in account settings.';
    case 502:
      return 'Upstream failure: Could not connect to skills.google. Server is waking up or temporarily unreachable.';
    case 504:
      return 'Gateway timeout: skills.google took too long to respond (>25s). Please try again.';
    default:
      return `Server returned HTTP ${status}. Please try again later.`;
  }
}
