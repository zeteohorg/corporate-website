import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';
import { SITE_ORIGIN } from '$lib/origin';
import * as YAML from 'yaml';

function buildParamValues(modules: Record<string, unknown>) {
	const values: { values: string[]; lastmod: string }[] = [];

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

		values.push({
			values: [langMatch[1], slug],
			lastmod: new Date(meta.updated || meta.date).toISOString()
		});
	}

	return values;
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

	return await sitemap.response({
		origin: SITE_ORIGIN,
		excludeRoutePatterns: ['^/stripe/.*', '.*\\(login\\).*'],
		paramValues: {
			'/[lang=lang]/blog/[slug]': buildParamValues(blogModules),
			'/[lang=lang]/news/[slug]': buildParamValues(newsModules)
		}
	});
};
