export interface TrackingData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  landing_page: string;
  click_id: string;
  first_visit: string;
  tracking_url: string;
}

const STORAGE_KEY = "fnb_tracking";

function getUrlParam(key: string): string {
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || "";
}

function detectClickId(): string {
  const fbclid = getUrlParam("fbclid");
  if (fbclid) return `fbclid:${fbclid}`;
  const gclid = getUrlParam("gclid");
  if (gclid) return `gclid:${gclid}`;
  const ttclid = getUrlParam("ttclid");
  if (ttclid) return `ttclid:${ttclid}`;
  return "";
}

function detectSourceFromReferrer(referrer: string): Pick<TrackingData, "utm_source" | "utm_medium"> {
  if (!referrer) return { utm_source: "direct", utm_medium: "none" };
  const ref = referrer.toLowerCase();
  if (ref.includes("facebook.com") || ref.includes("fb.com")) {
    return { utm_source: "facebook", utm_medium: "organic" };
  }
  if (ref.includes("google.com") || ref.includes("google.co")) {
    return { utm_source: "google", utm_medium: "organic" };
  }
  if (ref.includes("zalo.me") || ref.includes("zalo.vn") || ref.includes("chat.zalo")) {
    return { utm_source: "zalo", utm_medium: "referral" };
  }
  if (ref.includes("tiktok.com")) {
    return { utm_source: "tiktok", utm_medium: "organic" };
  }
  if (ref.includes("youtube.com")) {
    return { utm_source: "youtube", utm_medium: "organic" };
  }
  return { utm_source: "direct", utm_medium: "none" };
}

export function captureTrackingParams(): void {
  const existingData = sessionStorage.getItem(STORAGE_KEY);
  const utmSource = getUrlParam("utm_source");
  const utmMedium = getUrlParam("utm_medium");
  const utmCampaign = getUrlParam("utm_campaign");
  const utmContent = getUrlParam("utm_content");
  const utmTerm = getUrlParam("utm_term");

  if (utmSource || utmMedium || utmCampaign || utmContent || utmTerm) {
    // UTM params found in URL — save/update them
    const referrer = document.referrer;
    const landingPage = window.location.pathname;
    const clickId = detectClickId();
    const firstVisit = existingData ? JSON.parse(existingData).first_visit : new Date().toISOString();
    const trackingUrl = window.location.href;
    const tracking: TrackingData = {
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      referrer,
      landing_page: landingPage,
      click_id: clickId,
      first_visit: firstVisit,
      tracking_url: trackingUrl,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tracking));
  } else if (existingData) {
    // No UTM params, but existing session data — keep it, update landing page
    const parsed: TrackingData = JSON.parse(existingData);
    parsed.landing_page = window.location.pathname;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } else {
    // No UTM params and no existing session data — auto-detect from referrer
    const referrer = document.referrer;
    const autoDetected = detectSourceFromReferrer(referrer);
    const landingPage = window.location.pathname;
    const clickId = detectClickId();
    const trackingUrl = window.location.href;
    const tracking: TrackingData = {
      utm_source: autoDetected.utm_source,
      utm_medium: autoDetected.utm_medium,
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      referrer,
      landing_page: landingPage,
      click_id: clickId,
      first_visit: new Date().toISOString(),
      tracking_url: trackingUrl,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tracking));
  }
}

export function getTrackingData(): TrackingData {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      referrer: "",
      landing_page: "",
      click_id: "",
      first_visit: "",
      tracking_url: "",
    };
  }
  try {
    return JSON.parse(raw) as TrackingData;
  } catch {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      referrer: "",
      landing_page: "",
      click_id: "",
      first_visit: "",
      tracking_url: "",
    };
  }
}

export function getSourceLabel(): string {
  const data = getTrackingData();
  const { utm_source, utm_medium, utm_content } = data;

  if (utm_source && utm_medium && utm_content) {
    const source = utm_source.charAt(0).toUpperCase() + utm_source.slice(1);
    return `${source} - ${utm_medium} - ${utm_content}`;
  }
  if (utm_source && utm_medium) {
    const source = utm_source.charAt(0).toUpperCase() + utm_source.slice(1);
    return `${source} - ${utm_medium}`;
  }
  if (utm_source) {
    return utm_source.charAt(0).toUpperCase() + utm_source.slice(1);
  }
  return "Direct";
}

export function getTrackingFormParams(): URLSearchParams {
  const data = getTrackingData();
  const source = getSourceLabel();
  const params = new URLSearchParams();
  params.append("source", source);
  params.append("utm_source", data.utm_source);
  params.append("utm_medium", data.utm_medium);
  params.append("utm_campaign", data.utm_campaign);
  params.append("utm_content", data.utm_content);
  params.append("utm_term", data.utm_term);
  params.append("referrer", data.referrer);
  params.append("landing_page", data.landing_page);
  params.append("click_id", data.click_id);
  params.append("tracking_url", data.tracking_url);
  return params;
}
