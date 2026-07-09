/**
 * meta.ts
 * - Convention: your paginated routes are expected to use a param name of `page` for the page like
 *  `/blog/[page]`.
 */
import { SITE_ORIGIN } from '$lib/origin';

/**
 * Meta - Route metadata specified by the developer.
 *
 * @property title - Page title.
 * @property description - Meta description.
 * @property ogImage - Relative path to Open Graph image. Becomes an absolute URL during build.
 * @property ogType - Open Graph type. Always "website" unless "article" for a blog post or similar.
 * @property ogTitle - Open Graph title.
 * @property ogDescription - Open Graph description.
 */
export type Meta = {
	title: string;
	description: string;
	ogType?: 'website' | 'article';
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
};

/**
 * FullMeta - Type returned from `getMeta()`; used for the final meta obj within `+layout.svelte`.
 */
export type FullMeta = {
	title: string;
	description: string;
	canonicalUrl: string;
	ogType: 'website' | 'article';
	ogTitle: string;
	ogDescription: string;
	ogImage: string;
	ogUrl: string;
};

/**
 * Format title however you prefer.
 */
export function formatTitle({ title, pageParam }: { title: string; pageParam: string }) {
	const page = pageParam ? Number.parseInt(pageParam) : 1;

	const arr: string[] = [];

	if (title) {
		arr.push(title);
	}

	if (page > 1) {
		arr.push(`Page ${page}`);
	}

	return arr.join(' · ');
}

/**
 * Determines the canonical URL for a given URL object.
 *
 * @param url - URL object.
 * @returns Canonical URL as a string.
 *
 * @remarks
 * - Remove any trailing segment from the path is numeric with the assumption it's a page
 *   number--i.e. foo/2.
 * - The function assumes pages are used in your routes as `/blog/2` and use a param name of `page`
 *   like `/blog/[page]`.
 * - Absolute URL is preferred for canonical, though Google can handle relative URLs. But since this
 *   is also our `og:url` it needs to be absolute.
 * - Uses `SITE_ORIGIN` rather than `url.origin`: this site prerenders every route, and
 *   SvelteKit bakes `url.origin` as the placeholder host `http://sveltekit-prerender` at build
 *   time for prerendered pages, not the real production origin.
 */
export function getCanonicalUrl(url: URL, pageParam: string | undefined) {
	const { pathname } = url;
	const path = pageParam ? pathname.replace(/\/\d+$/, '') : pathname;
	return SITE_ORIGIN + path;
}

export type GetMetaParms = {
	defaultTitle: string;
	defaultDescription: string;
	defaultOGImage: string;
	routeMeta: Meta;
	pageParam: string | undefined;
	url: URL;
};

/**
 * Gets metadata for a page based on provided parameters.
 *
 * @param params
 * @param params.siteName - From PUBLIC_SITE_NAME.
 * @param params.defaultTitle - From PUBLIC_DEFAULT_TITLE.
 * @param params.defaultDescription - From PUBLIC_DEFAULT_DESCRIPTION.
 * @param params.defaultOGImage - Path to the default Open Graph image URL to use. Use a relative
 * path b/c SvelteKit will add the origin during build, making it an absolute URL.
 * @param params.routeMeta - From `$page.data?.meta`. The `meta` object returned from a route's load
 * function, used to override default metadata values.
 * @param params.pageParam - The current page param, if any.
 * @param params.url - Current URL object
 * @returns A FullMeta object containing all metadata needed for `+layout.svelte`
 *
 * @remarks
 * This function combines default values, route-specific metadata, and derived values to create a
 * comprehensive set of metadata for a page. It handles title formatting, canonical URL generation,
 * and fallback logic for various metadata fields.
 */
export function getMeta({
	defaultTitle,
	defaultDescription,
	defaultOGImage,
	routeMeta,
	pageParam,
	url
}: GetMetaParms): FullMeta {
	const title = formatTitle({
		title: routeMeta?.title ?? defaultTitle,
		pageParam: pageParam ?? ''
	});

	const canonicalUrl = getCanonicalUrl(url, pageParam);
	const rawOgImage = routeMeta?.ogImage ?? defaultOGImage ?? '';
	const ogImage = rawOgImage.startsWith('http') ? rawOgImage : `${SITE_ORIGIN}${rawOgImage}`;

	const meta: FullMeta = {
		title,
		description: routeMeta?.description ?? defaultDescription ?? '',
		canonicalUrl,
		ogTitle: routeMeta?.ogTitle ?? routeMeta?.title ?? defaultTitle ?? '',
		ogDescription: routeMeta?.ogDescription ?? routeMeta?.description ?? defaultDescription ?? '',
		ogImage,
		ogUrl: canonicalUrl,
		ogType: routeMeta?.ogType ?? 'website'
	};

	return meta;
}
