const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
  "mc_eid",
  "_hsenc",
  "_hsmi",
  "igshid",
];

function removeTrackingParams(urlString) {
  try {
    const url = new URL(urlString);

    TRACKING_PARAMS.forEach((param) => url.searchParams.delete(param));

    return url.toString();
  } catch {
    return urlString;
  }
}

function extractDestination(currentUrl) {
  const url = new URL(currentUrl);

  // LinkedIn
  if (currentUrl.includes("linkedin.com/safety/go"))
    return url.searchParams.get("url");

  // Facebook
  if (currentUrl.includes("facebook.com/l.php"))
    return url.searchParams.get("u");

  // Instagram
  if (currentUrl.includes("l.instagram.com")) return url.searchParams.get("u");

  // Google
  if (currentUrl.includes("google.com/url")) return url.searchParams.get("q");

  // YouTube
  if (currentUrl.includes("youtube.com/redirect"))
    return url.searchParams.get("q");

  // Reddit
  if (currentUrl.includes("out.reddit.com")) return url.searchParams.get("url");

  // Outlook SafeLinks
  if (currentUrl.includes("safelinks.protection.outlook.com"))
    return url.searchParams.get("url");

  return null;
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  // Ignore iframes
  if (details.frameId !== 0) return;

  try {
    const target = extractDestination(details.url);

    if (!target) return;

    let cleanUrl = decodeURIComponent(target);

    cleanUrl = removeTrackingParams(cleanUrl);

    chrome.tabs.update(details.tabId, {
      url: cleanUrl,
    });
  } catch (err) {
    console.error("RedirectX:", err);
  }
});
