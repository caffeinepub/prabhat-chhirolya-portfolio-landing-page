# Specification

## Summary
**Goal:** Fix X (Twitter) OG/Twitter card caching issues by serving a new versioned OG image as a direct static asset and updating metadata URLs to be consistent.

**Planned changes:**
- Add a new versioned OG/Twitter card image file at `frontend/public/assets/ogcard-v2.jpg` to be served directly as a static asset.
- Update `frontend/index.html` Open Graph and Twitter meta tags so `og:image`, `og:image:secure_url`, and `twitter:image` all use the absolute URL `https://www.prabhatchhirolya.com/assets/ogcard-v2.jpg`.
- Update `frontend/index.html` canonical link, `og:url`, and `twitter:url` to consistently use `https://www.prabhatchhirolya.com/` (with trailing slash).
- Update `frontend/public/.ic-assets.json5` to explicitly include `assets/ogcard-v2.jpg` (not ignored) and serve it with at least `Content-Type: image/jpeg`.
- Update `frontend/OG_PREVIEW_VERIFICATION.md` to reference the new OG image URL/path and the correct deployed file location.

**User-visible outcome:** When sharing the site URL on X/Twitter (and other platforms), link previews use the updated OG image from a stable, versioned URL with consistent metadata.
