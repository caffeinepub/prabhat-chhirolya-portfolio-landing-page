# Open Graph / Twitter Card Preview Verification

This document describes how to verify that social media previews (Open Graph cards) are working correctly for the portfolio site.

## Production URLs to Test

1. **Main site**: `https://www.prabhatchhirolya.com/`
2. **OG card image**: `https://www.prabhatchhirolya.com/assets/ogcard-v3.jpg`

## Verification Steps

### 1. Verify Image is Accessible

Open `https://www.prabhatchhirolya.com/assets/ogcard-v3.jpg` in your browser:
- ✅ Should return HTTP 200
- ✅ Should display the OG card image (not a 404 page or HTML)
- ✅ Should have `Content-Type: image/jpeg` header
- ✅ Image should be 1200×630 pixels

### 2. Test Social Media Previews

#### OpenGraph.xyz Validator (PRIMARY VALIDATOR)
1. Visit: https://www.opengraph.xyz/
2. Enter: `https://www.prabhatchhirolya.com/`
3. Click "Submit" or press Enter
4. Expected: Large image preview with title, description, and ogcard-v3.jpg image (1200×630)
5. Verify: "The OG Image URL appears to be valid and reachable" (no errors)

**Note**: This validator is particularly strict about image accessibility and will report if the image URL is invalid or unreachable.

#### X/Twitter Card Validator
1. Visit: https://cards-dev.twitter.com/validator
2. Enter: `https://www.prabhatchhirolya.com/`
3. Click "Preview card"
4. Expected: Large image card with title, description, and ogcard-v3.jpg image

**Note**: The versioned filename (ogcard-v3.jpg) helps bypass Twitter's aggressive caching. If you still see an old preview:
- Wait 24-48 hours for Twitter's cache to expire naturally
- Use the validator multiple times to force a re-scrape
- The new versioned URL should eventually replace the cached preview

#### Facebook/LinkedIn Debugger
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter: `https://www.prabhatchhirolya.com/`
3. Click "Scrape Again" to force a fresh fetch
4. Expected: Preview with ogcard-v3.jpg image

#### Manual Test
1. Post the URL `https://www.prabhatchhirolya.com/` on X/Twitter, Facebook, or LinkedIn
2. Wait a few seconds for the preview to load
3. Expected: Rich preview card with the new OG image

## Troubleshooting

### "OG Image URL appears to be invalid or unreachable" Error

This error from opengraph.xyz or other validators typically means:

1. **File missing from public directory**: The `ogcard-v3.jpg` file doesn't exist at `frontend/public/assets/ogcard-v3.jpg`
   - **Fix**: Ensure the file `ogcard-v3.jpg` (1200×630 JPEG) is physically present in `frontend/public/assets/` directory
   - **Source**: Copy from `assets/ogcardnew.jpg` or `assets/generated/ogcard-v3.jpg.dim_1200x630.jpg`

2. **Not deployed to asset canister**: The file wasn't included in the IC asset canister deployment
   - **Fix**: Verify `.ic-assets.json5` includes the `assets/ogcard-v3.jpg` rule with `"ignore": false`
   - **Fix**: Ensure the file is present before running `dfx deploy`

3. **Content-Type issue**: The server is returning HTML instead of `image/jpeg`
   - **Fix**: Add explicit `Content-Type: image/jpeg` header in `.ic-assets.json5`

4. **Wrong path**: The file is in `assets/generated/` but not copied to the correct location
   - **Fix**: The file MUST be at `frontend/public/assets/ogcard-v3.jpg` (in the assets subdirectory)

5. **Corrupted JPEG**: The file downloads but is blank/invalid
   - **Fix**: Re-export the image as a clean baseline RGB JPEG (non-progressive, no EXIF issues)
   - **Fix**: Verify the file opens correctly in multiple image viewers before deployment
   - **Fix**: Ensure `frontend/public/assets/ogcard-v3.jpg` is byte-identical to `frontend/public/assets/generated/ogcard-v3.jpg.dim_1200x630.jpg`

### Preview Not Showing
- **Cache issue**: Social platforms cache previews for 24-48 hours. The versioned filename helps, but use validator tools to force re-scrape.
- **Image not accessible**: Verify `https://www.prabhatchhirolya.com/assets/ogcard-v3.jpg` returns 200 and displays correctly.
- **Metadata missing**: Check that `index.html` contains all required OG and Twitter meta tags.
- **File location**: Ensure `ogcard-v3.jpg` exists at `frontend/public/assets/ogcard-v3.jpg`.
- **Corrupted file**: Download the production URL and verify it opens correctly in an image viewer.

### Old Preview Showing
- The versioned filename (ogcard-v3.jpg) should bypass most caching issues
- Use the validator tools above to force a re-scrape
- Wait for platform cache to expire (24-48 hours)

## Required Metadata (Already Implemented)

The following meta tags are configured in `frontend/index.html`:

**Open Graph**:
- `og:title`, `og:type`, `og:description`, `og:url`
- `og:image`, `og:image:secure_url`
- `og:image:type`, `og:image:width`, `og:image:height`, `og:image:alt`

**Twitter Card**:
- `twitter:card` (summary_large_image)
- `twitter:title`, `twitter:description`
- `twitter:image`, `twitter:image:alt`, `twitter:url`

**URL Consistency**:
- All URLs use the exact same format with trailing slash: `https://www.prabhatchhirolya.com/`
- Canonical, og:url, and twitter:url are all consistent

## Image Specifications

The OG card image (`ogcard-v3.jpg`) must meet these requirements:
- **Recommended size**: 1200×630 pixels (1.91:1 aspect ratio)
- **Format**: JPEG (baseline/non-progressive, RGB, no EXIF issues)
- **Max file size**: < 5 MB (< 1 MB recommended)
- **Min size**: 600×314 pixels
- **Location**: `frontend/public/assets/ogcard-v3.jpg` (deployed to asset canister under /assets/)
- **Quality**: Must be decodable by social media scrapers (not blank/corrupt)

## Deployment Checklist

**CRITICAL**: Before deploying, verify:
- [ ] `frontend/public/assets/ogcard-v3.jpg` exists and is a valid 1200×630 JPEG file
- [ ] `frontend/public/assets/generated/ogcard-v3.jpg.dim_1200x630.jpg` exists (source tracking)
- [ ] **BYTE-IDENTICAL CHECK**: Verify `frontend/public/assets/ogcard-v3.jpg` is byte-identical to `frontend/public/assets/generated/ogcard-v3.jpg.dim_1200x630.jpg` (use `diff` or file hash comparison)
- [ ] The file is a clean baseline RGB JPEG (not PNG renamed to .jpg, not progressive, no EXIF issues)
- [ ] The file opens correctly in multiple image viewers (Chrome, Firefox, Preview/Photos app)
- [ ] `.ic-assets.json5` includes `assets/ogcard-v3.jpg` with `"ignore": false` and explicit `Content-Type: image/jpeg` header
- [ ] `.well-known/ic-domains` lists both `prabhatchhirolya.com` and `www.prabhatchhirolya.com`
- [ ] `index.html` references `https://www.prabhatchhirolya.com/assets/ogcard-v3.jpg` (absolute URL with trailing slash on domain)
- [ ] All URLs (canonical, og:url, twitter:url) use consistent format: `https://www.prabhatchhirolya.com/`
- [ ] After deployment, test `https://www.prabhatchhirolya.com/assets/ogcard-v3.jpg` directly in browser (should show image, not 404)
- [ ] Download the production URL and verify the file opens correctly (not blank/corrupt)
- [ ] Run through opengraph.xyz validator to confirm image is reachable and valid
- [ ] Verify HTTP response headers include `Content-Type: image/jpeg`

## File Source Mapping

The OG card image should be sourced from:
- **Primary source**: `assets/ogcardnew.jpg` (user-uploaded final version)
- **Generated source**: `assets/generated/ogcard-v3.jpg.dim_1200x630.jpg` (pre-sized version for tracking)
- **Deployment target**: `frontend/public/assets/ogcard-v3.jpg` (this is what gets deployed to the asset canister)

**Important**: The file in `frontend/public/assets/ogcard-v3.jpg` is the source-of-truth for deployment. It must be:
1. Physically present in that directory before running `dfx deploy` or the build process
2. Byte-identical to `frontend/public/assets/generated/ogcard-v3.jpg.dim_1200x630.jpg`
3. A valid, decodable baseline RGB JPEG (not blank/corrupt)

## Cache Busting Strategy

The versioned filename (`ogcard-v3.jpg` instead of `ogcard-v2.jpg`) is a cache-busting technique:
- Social media platforms cache OG images aggressively by URL
- Changing the filename forces platforms to fetch the new image
- If you need to update the image again in the future, increment the version: `ogcard-v4.jpg`, `ogcard-v5.jpg`, etc.

---

**Last updated**: February 9, 2026 (Version 3: Re-exported from ogcardnew.jpg as clean baseline RGB JPEG to fix blank/corrupt download issue)
