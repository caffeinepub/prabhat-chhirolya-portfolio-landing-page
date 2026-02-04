# Specification

## Summary
**Goal:** Fix deployment so the Open Graph/Twitter card image is publicly available at `/ogcard.jpg` for crawlers.

**Planned changes:**
- Add/ensure `frontend/public/ogcard.jpg` exists in the repo as the root OG image asset (1200x630 JPEG).
- Verify and adjust `frontend/public/.ic-assets.json5` so `ogcard.jpg` is included in asset-canister upload rules (not ignored) and is served at `/ogcard.jpg`.
- Confirm `frontend/index.html` continues to reference `https://www.prabhatchhirolya.com/ogcard.jpg` for `og:image`, `og:image:secure_url`, and `twitter:image`, with `og:image:type` set to `image/jpeg`.

**User-visible outcome:** Sharing the site link on platforms that use Open Graph/Twitter cards reliably shows the correct preview image, and `https://www.prabhatchhirolya.com/ogcard.jpg` returns the JPEG (HTTP 200) instead of a missing/incorrect response.
