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
    "si"
];

function removeTrackingParams(urlString) {

    try {

        const url = new URL(urlString);

        TRACKING_PARAMS.forEach(param => {
            url.searchParams.delete(param);
        });

        return url.toString();

    } catch {

        return urlString;

    }

}


function extractDestination(currentUrl) {

    const url = new URL(currentUrl);
    const host = url.hostname;

    // LinkedIn
    if (
        host.includes("linkedin.com") &&
        url.pathname.startsWith("/safety/go")
    ) {
        return url.searchParams.get("url");
    }

    // Facebook
    if (
        host.includes("facebook.com") &&
        url.pathname === "/l.php"
    ) {
        return url.searchParams.get("u");
    }

    // Instagram
    if (host === "l.instagram.com") {
        return url.searchParams.get("u");
    }

    // Google
    if (
        host.includes("google.") &&
        url.pathname === "/url"
    ) {
        return url.searchParams.get("q");
    }

    // YouTube
    if (
        host.includes("youtube.com") &&
        url.pathname === "/redirect"
    ) {
        return url.searchParams.get("q");
    }

    // Reddit
    if (host === "out.reddit.com") {
        return url.searchParams.get("url");
    }

    // Twitter/X
    if (host === "t.co") {
        return null; // cannot decode locally
    }

    // Outlook SafeLinks
    if (
        host.includes("safelinks.protection.outlook.com")
    ) {
        return url.searchParams.get("url");
    }

    return null;
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {

    if (!changeInfo.url)
        return;

    try {

        const target = extractDestination(changeInfo.url);

        if (!target)
            return;

        let cleanUrl = decodeURIComponent(target);

        cleanUrl = removeTrackingParams(cleanUrl);

        chrome.tabs.update(tabId, {
            url: cleanUrl
        });

    } catch (error) {

        console.error("RedirectX:", error);

    }

});