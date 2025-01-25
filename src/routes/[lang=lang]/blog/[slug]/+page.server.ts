import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as YAML from 'yaml';

export const load: PageServerLoad = async ({ fetch, params }) => {
	try {
		const { lang, slug } = params;
		const cleanSlug = slug.replace(/\./g, '');

		const modules = import.meta.glob(['/src/content/blog/**/*.{md,mdx}'], {
			eager: true,
			query: '?raw',
			import: 'default'
		});

		const mdxPath = `/src/content/blog/${lang}/${cleanSlug}.mdx`;
		const mdPath = `/src/content/blog/${lang}/${cleanSlug}.md`;

		const content = modules[mdxPath] || modules[mdPath];
		if (!content) {
			throw error(404, `Could not find post ${cleanSlug}`);
		}

		// Split the content into frontmatter and markdown
		const [, frontmatterContent, markdown] =
			content.match(/---\n([\s\S]*?)\n---\n?([\s\S]*)/) || [];

		if (!frontmatterContent || !markdown) {
			throw error(500, 'Invalid post format');
		}

		// Parse frontmatter
		const metadata = YAML.parse(frontmatterContent);

		// Process MDX content
		const response = await fetch('/api/mdx', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ content: markdown })
		});

		if (!response.ok) {
			throw error(500, 'Failed to process MDX content');
		}

		const { html } = await response.json();

		return {
			metadata: {
				title: metadata.title || cleanSlug,
				date: metadata.date || new Date().toISOString(),
				description: metadata.description || '',
				published: metadata.published ?? false,
				thumbnail: metadata.thumbnail
			},
			html,
			content: markdown // Include raw content for debugging
		};
	} catch (e) {
		console.error('Error loading post:', e);
		if (e.status === 404) throw e;
		throw error(500, 'Internal server error');
	}
};
