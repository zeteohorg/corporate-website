import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as YAML from 'yaml';

export const load: PageServerLoad = async ({ params }) => {
	try {
		// Import all posts for the current language
		const files = import.meta.glob('/src/content/blog/**/*.{md,mdx}', {
			eager: true,
			query: '?raw',
			import: 'default'
		});

		const posts = Object.entries(files)
			.filter(([path]) => path.includes(`/blog/${params.lang}/`))
			.map(([path, content]) => {
				// Extract and parse frontmatter
				const match = content.match(/---\n([\s\S]*?)\n---/);
				if (!match) return null;

				try {
					const metadata = YAML.parse(match[1]);
					const slug = path
						.split('/')
						.pop()
						?.replace(/\.(md|mdx)$/, '');

					return {
						slug,
						title: metadata.title,
						description: metadata.description,
						date: metadata.date,
						published: metadata.published,
						thumbnail: metadata.thumbnail
					};
				} catch (e) {
					console.error(`Error parsing frontmatter for ${path}:`, e);
					return null;
				}
			})
			.filter((post) => post && post.published)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return { posts };
	} catch (e) {
		console.error('Error loading blog posts:', e);
		throw error(404, 'Blog posts not found');
	}
};
