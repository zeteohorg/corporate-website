import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as YAML from 'yaml';
import { compile } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { lang, slug } = params;
		const cleanSlug = slug.replace(/\./g, ''); // Remove dots from slug

		const modules = import.meta.glob('/src/content/news/**/*.{md,mdx}', {
			eager: true,
			query: '?raw',
			import: 'default'
		});

		let content;
		let matchedPath;
		for (const [path, moduleContent] of Object.entries(modules)) {
			// Match either with or without dots to find the file
			const fileSlug = path
				.split('/')
				.pop()
				?.replace(/\.(md|mdx)$/, '');
			if (path.includes(`/${lang}/`) && (fileSlug === slug || fileSlug === cleanSlug)) {
				content = moduleContent;
				matchedPath = path;
				break;
			}
		}

		if (!content) {
			throw error(404, `Could not find news post ${cleanSlug}`);
		}

		// Extract frontmatter and content
		const [, frontmatterContent, markdown] =
			content.match(/---\n([\s\S]*?)\n---\n?([\s\S]*)/) || [];
		if (!frontmatterContent || !markdown) {
			throw error(500, 'Invalid post format');
		}

		// Parse frontmatter
		const metadata = YAML.parse(frontmatterContent);

		// Remove script tags and imports from markdown
		const cleanMarkdown = markdown
			.replace(/<script[\s\S]*?<\/script>/g, '')
			.replace(/^import.*$/gm, '')
			.trim();

		// Compile MDX
		const result = await compile(cleanMarkdown, {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug]
		});

		if (!result) {
			throw error(500, 'Failed to compile MDX content');
		}

		// Replace MDX component tags with placeholder divs
		const processedHtml = result.code.replace(
			/<(CodeBlock|Blockquote|Table|ImageGallery|VideoEmbed|Callout)([^>]*?)>([\s\S]*?)<\/\1>/g,
			(_, name, attrs, content) => {
				// Parse attributes into props object
				const props = {};
				const attrMatches = attrs.matchAll(/(\w+)=\{([^}]+)\}/g);
				for (const [, key, value] of attrMatches) {
					props[key] = value.trim();
				}

				// Create placeholder with encoded props and content
				return `<div 
          data-mdx="${name}" 
          data-props="${encodeURIComponent(JSON.stringify(props))}"
          data-content="${encodeURIComponent(content)}"
        ></div>`;
			}
		);

		// Get all news posts for navigation
		const posts = Object.entries(modules)
			.filter(([path]) => path.includes(`/news/${lang}/`))
			.map(([path, content]) => {
				const [, frontmatter] = (content as string).match(/---\n([\s\S]*?)\n---/) || [];
				if (!frontmatter) return null;
				const meta = YAML.parse(frontmatter);
				const fileSlug = path
					.split('/')
					.pop()
					?.replace(/\.(md|mdx)$/, '');
				return {
					slug: fileSlug?.replace(/\./g, ''), // Clean the slug for consistency
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
			content: cleanMarkdown,
			html: processedHtml,
			previousPost,
			nextPost,
			slug: cleanSlug // Return the clean slug for consistency
		};
	} catch (e) {
		console.error('Error loading news post:', e);
		if (e.status === 404) throw e;
		throw error(500, 'Internal server error');
	}
};
