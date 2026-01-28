import { supabase } from "@/integrations/supabase/client";

const VISITOR_ID_KEY = "portfolio_visitor_id";
const SESSION_ID_KEY = "portfolio_session_id";
const LAST_TRACKED_KEY = "portfolio_last_tracked";
const TRACK_THROTTLE_MS = 2000; // Don't track same page within 2 seconds

/**
 * Get or create a persistent visitor ID (stored in localStorage)
 */
export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    // Generate a simple ID: timestamp + random string
    visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

/**
 * Get or create a session ID (stored in sessionStorage, resets per tab)
 */
export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Parse UTM parameters from URL
 */
export function parseUtm(search: string): {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
} {
  const params = new URLSearchParams(search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
  };
}

/**
 * Extract domain from referrer URL
 */
export function referrerDomain(referrer: string | null): string | null {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * Check if we should track this page view
 * - Respects Do Not Track
 * - Only tracks public pages (not /admin, /profile, /auth)
 */
export function shouldTrack(path: string): boolean {
  // Respect Do Not Track
  if (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes") {
    return false;
  }

  // Only track public pages
  if (path.match(/^\/(admin|profile|auth)/)) {
    return false;
  }

  return true;
}

/**
 * Track a page view to Supabase
 * Includes throttling to avoid duplicate rapid-fire events
 */
export async function trackPageViewToSupabase(
  path: string,
  search: string = ""
): Promise<void> {
  if (typeof window === "undefined") return;
  if (!shouldTrack(path)) return;

  // Throttle: don't track same path within TRACK_THROTTLE_MS
  const fullPath = path + search;
  const lastTracked = sessionStorage.getItem(LAST_TRACKED_KEY);
  const now = Date.now();
  if (lastTracked) {
    const [lastPath, lastTime] = lastTracked.split("|");
    if (lastPath === fullPath && now - parseInt(lastTime, 10) < TRACK_THROTTLE_MS) {
      return; // Skip duplicate
    }
  }
  sessionStorage.setItem(LAST_TRACKED_KEY, `${fullPath}|${now}`);

  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();
  const utm = parseUtm(search);
  const referrer = document.referrer || null;
  const referrerDomainValue = referrerDomain(referrer);

  // Get user_id if logged in (optional)
  let userId: string | null = null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id || null;
  } catch {
    // Ignore auth errors, continue without user_id
  }

  try {
    const { error } = await supabase.from("page_views").insert({
      path: fullPath,
      referrer,
      referrer_domain: referrerDomainValue,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_term: utm.utm_term,
      utm_content: utm.utm_content,
      visitor_id: visitorId,
      session_id: sessionId,
      user_id: userId,
    });

    if (error) {
      // Silently fail in production, log in dev
      if (import.meta.env.DEV) {
        console.warn("Failed to track page view:", error);
      }
    }
  } catch (err) {
    // Silently fail - analytics should never break the app
    if (import.meta.env.DEV) {
      console.warn("Error tracking page view:", err);
    }
  }
}
