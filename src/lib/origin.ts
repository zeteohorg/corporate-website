import { PUBLIC_ORIGIN } from '$env/static/public';

/**
 * `PUBLIC_ORIGIN` isn't guaranteed to include a scheme (e.g. local `.env` files may set it to
 * just `www.zeteoh.com`). Absolute URLs built from a schemeless origin get treated as relative
 * paths by SvelteKit's prerender crawler and by browsers, so every consumer normalizes here
 * instead of using `PUBLIC_ORIGIN` directly.
 */
export const SITE_ORIGIN = PUBLIC_ORIGIN.startsWith('http')
	? PUBLIC_ORIGIN
	: `https://${PUBLIC_ORIGIN}`;
