import type { Handle } from '@sveltejs/kit';

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400..700&display=swap';

// Preconnect + non-render-blocking load of the Noto Sans JP web font. Injected
// only on Japanese pages (see app.html's %fonthead% placeholder).
const FONT_HEAD = `<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link rel="preload" href="${FONT_URL}" as="style" />
		<link rel="stylesheet" href="${FONT_URL}" media="print" onload="this.onload=null;this.media='all';" />
		<noscript><link rel="stylesheet" href="${FONT_URL}" /></noscript>`;

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.url.pathname.match(/^\/(en|ja)/)?.[1] ?? 'en';
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', lang).replace('%fonthead%', lang === 'ja' ? FONT_HEAD : '')
	});
};
