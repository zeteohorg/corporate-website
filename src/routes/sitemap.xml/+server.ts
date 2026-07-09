import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';
import { SITE_ORIGIN } from '$lib/origin';
import * as YAML from 'yaml';

type ParsedPost = { slug: string; lang: string; lastmod: string };

function parseModules(modules: Record<string, unknown>): ParsedPost[] {
	const posts: ParsedPost[] = [];

	for (const [path, raw] of Object.entries(modules)) {
		const langMatch = path.match(/\/(en|ja)\//);
		const slug = path
			.split('/')
			.pop()
			?.replace(/\.(md|mdx)$/, '')
			.replace(/\./g, '');
		if (!langMatch || !slug) continue;

		const [, frontmatterContent] = (raw as string).match(/---\n([\s\S]*?)\n---/) || [];
		if (!frontmatterContent) continue;

		const meta = YAML.parse(frontmatterContent);
		if (meta.published !== true) continue;

		posts.push({
			slug,
			lang: langMatch[1],
			lastmod: new Date(meta.updated || meta.date).toISOString()
		});
	}

	return posts;
}

// super-sitemap auto-duplicates every paramValues entry across all configured
// languages rather than accepting per-language values, so a slug that only
// exists in one language would otherwise appear as a 404'ing entry for the
// other language too. This dedupes to one (most-recent-lastmod) entry per
// slug for paramValues, and separately tracks which (lang, slug) pairs are
// real so processPaths can filter out the phantom cross-language entries.
function toSitemapData(posts: ParsedPost[]) {
	const bySlug = new Map<string, string>();
	const validPaths = new Set<string>();

	for (const { slug, lastmod } of posts) {
		const existing = bySlug.get(slug);
		if (!existing || lastmod > existing) bySlug.set(slug, lastmod);
	}

	return { bySlug, validPaths };
}

export const GET: RequestHandler = async () => {
	const blogModules = import.meta.glob('/src/content/blog/**/*.{md,mdx}', {
		eager: true,
		query: '?raw',
		import: 'default'
	});
	const newsModules = import.meta.glob('/src/content/news/**/*.{md,mdx}', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	const blogPosts = parseModules(blogModules);
	const newsPosts = parseModules(newsModules);
	const blog = toSitemapData(blogPosts);
	const news = toSitemapData(newsPosts);
	for (const { slug, lang } of blogPosts) blog.validPaths.add(`/${lang}/blog/${slug}`);
	for (const { slug, lang } of newsPosts) news.validPaths.add(`/${lang}/news/${slug}`);

	return await sitemap.response({
		origin: SITE_ORIGIN,
		excludeRoutePatterns: ['^/stripe/.*', '.*\\(login\\).*'],
		lang: { default: 'en', alternates: ['ja'] },
		paramValues: {
			'/[lang=lang]/blog/[slug]': Array.from(blog.bySlug, ([slug, lastmod]) => ({
				values: [slug],
				lastmod
			})),
			'/[lang=lang]/news/[slug]': Array.from(news.bySlug, ([slug, lastmod]) => ({
				values: [slug],
				lastmod
			}))
		},
		processPaths: (paths) =>
			paths.filter((p) => {
				const blogMatch = p.path.match(/^\/(en|ja)\/blog\/(.+)$/);
				if (blogMatch) return blog.validPaths.has(p.path);
				const newsMatch = p.path.match(/^\/(en|ja)\/news\/(.+)$/);
				if (newsMatch) return news.validPaths.has(p.path);
				return true;
			})
	});
};
