import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as YAML from 'yaml';
import { compile } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { lang, slug } = params;
		const cleanSlug = slug.replace(/\./g, '');

		const modules = import.meta.glob('/src/content/blog/**/*.{md,mdx}', {
			eager: true,
			query: '?raw',
			import: 'default'
		});

		// Find the matching content file
		let content;
		let filePath;
		for (const [path, moduleContent] of Object.entries(modules)) {
			if (path.includes(`/${lang}/`) && path.includes(cleanSlug)) {
				content = moduleContent;
				filePath = path;
				break;
			}
		}

		if (!content) {
			console.error('Available paths:', Object.keys(modules));
			throw error(404, `Could not find post ${cleanSlug}`);
		}

		const [, frontmatterContent, markdown] =
			content.match(/---\n([\s\S]*?)\n---\n?([\s\S]*)/) || [];

		if (!frontmatterContent || !markdown) {
			throw error(500, 'Invalid post format');
		}

		const metadata = YAML.parse(frontmatterContent);

		// Compile the MDX content
		const result = await compile(markdown, {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug]
		});

		if (!result) {
			throw error(500, 'Failed to compile MDX content');
		}

		// Process the MDX components to convert them to HTML with custom elements
		const processedHtml = result.code
			.replace(/<CodeBlock/g, '<mdx-code-block')
			.replace(/<\/CodeBlock>/g, '</mdx-code-block>')
			.replace(/<Blockquote/g, '<mdx-blockquote')
			.replace(/<\/Blockquote>/g, '</mdx-blockquote>')
			.replace(/<Table/g, '<mdx-table')
			.replace(/<\/Table>/g, '</mdx-table>')
			.replace(/<ImageGallery/g, '<mdx-gallery')
			.replace(/<\/ImageGallery>/g, '</mdx-gallery>')
			.replace(/<VideoEmbed/g, '<mdx-video')
			.replace(/<\/VideoEmbed>/g, '</mdx-video>')
			.replace(/<Callout/g, '<mdx-callout')
			.replace(/<\/Callout>/g, '</mdx-callout>');

		// Get all blog posts for navigation
		const posts = Object.entries(modules)
			.filter(([path]) => path.includes(`/blog/${lang}/`))
			.map(([path, content]) => {
				const [, frontmatter] = (content as string).match(/---\n([\s\S]*?)\n---/) || [];
				if (!frontmatter) return null;
				const meta = YAML.parse(frontmatter);
				return {
					slug: path
						.split('/')
						.pop()
						?.replace(/\.(md|mdx)$/, ''),
					...meta
				};
			})
			.filter((post): post is NonNullable<typeof post> => post !== null && post.published === true)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		const currentIndex = posts.findIndex((post) => post.slug === cleanSlug);
		const previousPost = posts[currentIndex + 1];
		const nextPost = posts[currentIndex - 1];

		return {
			metadata: {
				title: metadata.title || cleanSlug,
				date: metadata.date || new Date().toISOString(),
				description: metadata.description || '',
				published: metadata.published ?? false,
				author: metadata.author,
				tags: metadata.tags,
				thumbnail: metadata.thumbnail
			},
			content: markdown,
			html: processedHtml,
			previousPost,
			nextPost
		};
	} catch (e) {
		console.error('Error loading post:', e);
		if (e.status === 404) throw e;
		throw error(500, 'Internal server error');
	}
};
