# Specification

## Summary
**Goal:** Fix broken/unreachable OG/Twitter card previews by re-exporting `ogcardnew.jpg` into a standards-compliant OG image and deploying it as a new versioned static asset referenced by meta tags.

**Planned changes:**
- Re-export `ogcardnew.jpg` as a clean baseline (non-progressive) RGB JPEG, stripped metadata, exactly 1200×630, and verify it decodes correctly in common viewers.
- Add the newly exported image to `frontend/public/assets/` under a fresh versioned filename (e.g., `ogcard-v3.jpg`) and ensure deployment serves the exact JPEG bytes at the public URL.
- Update `frontend/index.html` Open Graph and Twitter meta tags to reference the new versioned OG image URL (replacing prior `ogcard-v2.jpg` references) while keeping existing canonical/URL formatting unchanged.
- Update `frontend/public/.ic-assets.json5` to explicitly serve the new image path with `Content-Type: image/jpeg` and caching headers, without removing older OG image rules.
- Update `frontend/OG_PREVIEW_VERIFICATION.md` to reference the new versioned OG image URL wherever it previously referenced `ogcard-v2.jpg`.

**User-visible outcome:** Sharing the site URL on platforms that use Open Graph/Twitter cards displays the correct preview image via a valid, reachable 1200×630 JPEG URL.
