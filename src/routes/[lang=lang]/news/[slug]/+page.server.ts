import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { compile } from 'mdsvex';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { lang, slug } = params;
		const postModule = await import(`../../../../content/news/${lang}/${slug}.md?raw`);
		const content = postModule.default;
		const compiled = await compile(content);
		const html = compiled?.code || '';

		const metadata = content.match(/---\n([\s\S]*?)\n---/)?.[1];
		const parsedMetadata =
			metadata?.split('\n').reduce(
				(acc, line) => {
					const [key, ...value] = line.split(':');
					if (key && value) {
						acc[key.trim()] = value.join(':').trim();
					}
					return acc;
				},
				{} as Record<string, string>
			) || {};

		return {
			html,
			metadata: {
				title: parsedMetadata.title?.replace(/['"]/g, '') || slug,
				date: parsedMetadata.date?.replace(/['"]/g, '') || new Date().toISOString(),
				description: parsedMetadata.description?.replace(/['"]/g, '') || ''
			}
		};
	} catch (e) {
		console.error(e);
		throw error(404, `Could not find news post ${params.slug}`);
	}
};
