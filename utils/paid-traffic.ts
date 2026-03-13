/**
 * Paid traffic detection utility.
 *
 * Checks URL parameters for paid traffic indicators (utm_source, gclid, fbclid, etc.)
 * and stores the result in sessionStorage so it persists across SPA route changes.
 *
 * Used to simplify navigation for paid traffic visitors — removing section links
 * and keeping only the logo + CTA to reduce distractions and improve conversion.
 */

const SESSION_KEY = 'mt_paid_traffic';

const PAID_SOURCES = ['meta', 'facebook', 'instagram', 'google', 'bing', 'linkedin', 'tiktok'];
const PAID_MEDIUMS = ['paid_social', 'paid', 'cpc', 'ppc', 'cpm', 'display', 'retargeting'];

/**
 * Detects whether the current visitor arrived via paid advertising.
 *
 * Checks (in order):
 * 1. sessionStorage cache (avoids re-parsing on every route change)
 * 2. utm_source / utm_medium URL parameters
 * 3. Platform click IDs (fbclid, gclid, msclkid, etc.)
 *
 * Once detected, the flag is stored for the entire browser session.
 */
export function isPaidTraffic(): boolean {
  // SSR safety
  if (typeof window === 'undefined') return false;

  // Check sessionStorage cache first
  const cached = sessionStorage.getItem(SESSION_KEY);
  if (cached !== null) return cached === '1';

  const params = new URLSearchParams(window.location.search);

  // Check utm_source against known paid sources
  const source = (params.get('utm_source') || '').toLowerCase();
  const medium = (params.get('utm_medium') || '').toLowerCase();

  const isPaid =
    PAID_SOURCES.includes(source) ||
    PAID_MEDIUMS.includes(medium) ||
    params.has('fbclid') ||
    params.has('gclid') ||
    params.has('msclkid') ||
    params.has('ttclid') ||
    params.has('li_fat_id');

  // Persist for the session so navigation within the SPA keeps the flag
  sessionStorage.setItem(SESSION_KEY, isPaid ? '1' : '0');

  return isPaid;
}
