import { loadMarkdownFiles } from '$lib/utils/markdown';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import * as YAML from 'yaml';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const modules = import.meta.glob('/src/content/news/**/*.{md,mdx}', {
			eager: true,
			query: '?raw',
			import: 'default'
		});

		const posts = Object.entries(modules)
			.filter(([path]) => path.includes(`/news/${params.lang}/`))
			.map(([path, content]) => {
				const [, frontmatter] = (content as string).match(/---\n([\s\S]*?)\n---/) || [];
				if (!frontmatter) return null;
				const meta = YAML.parse(frontmatter);
				const slug = path
					.split('/')
					.pop()
					?.replace(/\.(md|mdx)$/, '')
					?.replace(/\./g, '');  // Clean the slug
				return {
					slug,
					...meta
				};
			})
			.filter((post): post is NonNullable<typeof post> => 
				post !== null && post.published === true
			)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return { posts };
	} catch (e) {
		console.error('Error loading news posts:', e);
		throw error(404, 'News posts not found');
	}
};