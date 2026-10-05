# Press kit assets

Files for `/ja/press/` and `/en/press/` live in `static/press/<release-id>/` and are served as-is, so downloads are always the original files.

## Adding or replacing files for a release

1. Put the files in `static/press/<release-id>/` with the names listed in `src/lib/data/press.ts` (letters, digits, hyphens and underscores only), e.g. for `2026-10-06-ceatec-award`:
   - `2026-10-06_press-release.pdf`
   - `2026-10-06_trails-positioning-image.png` (1920×1080)
   - `2026-10-06_astra-usage-image.jpg` (1920×1080)
2. Run `tools/press/build-assets.sh <release-id>` (macOS). It writes:
   - `*-thumb.jpg` thumbnails shown on the page
   - `<date>_press-kit.zip` with the PDF and the original images (only once both the PDF and images are present)
   - `src/lib/data/press-manifest.json`, the list of files the page links to
3. Commit the originals and the generated files.

Until a file exists, the page shows it as "準備中 / Coming soon" instead of a broken link.

## Adding a new release

Add an entry at the top of `PRESS_RELEASES` in `src/lib/data/press.ts`, add its title and image captions to `src/lib/i18n/translations/press.ts` (keyed by the same `id`), then follow the steps above.
