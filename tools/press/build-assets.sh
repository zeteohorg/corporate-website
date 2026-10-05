#!/usr/bin/env bash
# Build the press kit's derived files for one release folder:
#   - <image>-thumb.jpg  thumbnails shown on /press/ (the originals stay untouched
#                        and are what the download links serve)
#   - the "download all" ZIP containing the PDF and the original images
#   - src/lib/data/press-manifest.json: which files exist and their sizes, so the
#     page links only to files that are actually there
#
# Usage:  tools/press/build-assets.sh 2026-10-06-ceatec-award
# Run it after placing or replacing files in static/press/<release>/, then commit
# the generated files. Requires macOS (`sips`) and `zip`.
set -euo pipefail

release="${1:?usage: $0 <release-id>  (folder name in static/press/)}"
root="$(cd "$(dirname "$0")/../.." && pwd)"
dir="$root/static/press/$release"

[ -d "$dir" ] || { echo "No such folder: $dir" >&2; exit 1; }
command -v sips >/dev/null || { echo "sips not found (macOS only)" >&2; exit 1; }

cd "$dir"
shopt -s nullglob

originals=()
for f in *.png *.jpg *.jpeg *.webp; do
	case "$f" in *-thumb.jpg) continue ;; esac
	originals+=("$f")
	thumb="${f%.*}-thumb.jpg"
	# 800px on the long side, JPEG: small enough for the page, never downloaded
	sips -s format jpeg -s formatOptions 80 -Z 800 "$f" --out "$thumb" >/dev/null
	echo "thumbnail: $thumb"
done

pdfs=(*.pdf)

# The ZIP bundles the PDF and the original images, so only build it once both exist;
# until then the page shows "download all" as coming soon.
zip_file="${release:0:10}_press-kit.zip" # 2026-10-06-ceatec-award -> 2026-10-06_press-kit.zip
rm -f "$zip_file"
if [ ${#pdfs[@]} -gt 0 ] && [ ${#originals[@]} -gt 0 ]; then
	# -X: no extra file attributes, -j: flat (no folders), -q: quiet
	zip -X -j -q "$zip_file" "${pdfs[@]}" "${originals[@]}"
	echo "zip: $zip_file"
	unzip -l "$zip_file"
else
	echo "zip: skipped (needs the PDF and the images; run again once all files are in place)" >&2
fi

# Record the files present (name -> bytes) for this release
manifest="$root/src/lib/data/press-manifest.json"
node - "$manifest" "$release" "$dir" <<'NODE'
const fs = require('fs');
const [manifest, release, dir] = process.argv.slice(2);
const data = fs.existsSync(manifest) ? JSON.parse(fs.readFileSync(manifest, 'utf8')) : {};
data[release] = Object.fromEntries(
	fs.readdirSync(dir).sort().filter((f) => !f.startsWith('.')).map((f) => [f, fs.statSync(`${dir}/${f}`).size])
);
fs.writeFileSync(manifest, JSON.stringify(data, null, '\t') + '\n');
NODE
echo "manifest: src/lib/data/press-manifest.json"
