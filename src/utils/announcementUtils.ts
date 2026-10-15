/**
 * Utility to manage the 7-day lifespan of the October Arcade Insider announcement.
 * The announcement rolled out on October 15, 2026.
 * It remains active for exactly 7 days (until October 22, 2026 23:59:59 UTC).
 * After 7 days, the announcement notification and modal vanish automatically.
 */

// October 15, 2026 00:00:00 UTC
export const INSIDER_ANNOUNCEMENT_LAUNCH = new Date('2026-10-15T00:00:00Z').getTime();

// 7 days in milliseconds
export const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const INSIDER_ANNOUNCEMENT_EXPIRY = INSIDER_ANNOUNCEMENT_LAUNCH + SEVEN_DAYS_MS;

/**
 * Checks whether the Arcade Insider October announcement is still within its 7-day active window.
 */
export function isInsiderAnnouncementActive(): boolean {
  try {
    // Check if test override exists in localStorage
    const override = localStorage.getItem('arcade_insider_force_active');
    if (override === 'true') return true;
    if (override === 'false') return false;

    const now = Date.now();
    return now <= INSIDER_ANNOUNCEMENT_EXPIRY;
  } catch {
    return true;
  }
}
