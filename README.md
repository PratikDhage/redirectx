# RedirectX

A lightweight Chrome extension that automatically bypasses redirect pages and removes tracking parameters — without requiring any user interaction.

---

## The Problem

Many websites wrap external links inside their own redirect systems.

For example, LinkedIn often converts:

```text
https://example.com
```

into:

```text
https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fexample.com
```

These redirect pages can:

* Add unnecessary latency
* Break older links
* Cause "Page Not Found" errors
* Expose tracking parameters
* Create a poor browsing experience

The issue is not limited to LinkedIn. Similar redirect mechanisms are used by Facebook, Instagram, Google, YouTube, Reddit, Outlook SafeLinks, and others.

---

## Solution

RedirectX intercepts redirect URLs before they become a problem.

Whenever a redirect page is detected, RedirectX:

1. Extracts the original destination URL
2. Decodes the URL automatically
3. Removes common tracking parameters
4. Instantly opens the actual website

No popup.

No copy-paste.

No backend server.

No telemetry.

No data collection.

Everything runs locally inside the browser.

---

## Supported Platforms

* LinkedIn
* Facebook
* Instagram
* Google
* YouTube
* Reddit
* Microsoft Outlook SafeLinks

---

## Removed Tracking Parameters

RedirectX removes common trackers including:

* `utm_source`
* `utm_medium`
* `utm_campaign`
* `utm_term`
* `utm_content`
* `fbclid`
* `gclid`
* `mc_eid`
* `_hsenc`
* `_hsmi`
* `igshid`

---

## Project Structure

```text
redirectx/

├── manifest.json
├── background.js
├── README.md
└── icons/
      ├── icon16.png
      ├── icon48.png
      └── icon128.png
```

---

## Installation (Git Clone Method)

### Clone Repository

```bash
git clone https://github.com/PratikDhage/redirectx.git
```

Move into the project:

```bash
cd redirectx
```

---

### Load Extension

Open:

```text
chrome://extensions
```

Enable:

```text
Developer Mode
```

Click:

```text
Load unpacked
```

Select the `redirectx` folder.

Done.

---

## Installation (ZIP Method)

### Download ZIP

Download:

```text
redirectx.zip
```

Extract the ZIP file.

---

### Load Extension

Open:

```text
chrome://extensions
```

Enable:

```text
Developer Mode
```

Click:

```text
Load unpacked
```

Select the extracted folder.

Done.

---

## Demo

### Input

```text
https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fgithub.com
```

### RedirectX automatically opens

```text
https://github.com
```

---

## Why RedirectX?

* Zero backend dependencies
* Near-zero latency
* Privacy-focused
* No telemetry
* No account required
* No popup interaction
* Lightweight Manifest V3 architecture

---

## Tech Stack

* JavaScript
* Chrome Extension APIs
* Manifest V3

---

## Future Improvements

* Firefox support
* Chrome Web Store publishing
* Additional redirect providers
* More tracker removal rules
* Support for URL shorteners

---

## License

MIT License
