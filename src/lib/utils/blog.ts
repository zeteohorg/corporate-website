import type { Post, TableOfContentsItem } from '$lib/types';
import { compile } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import * as YAML from 'yaml';

// Cache for compiled posts
const postCache = new Map<string, Post>();

export async function loadPost(lang: string, slug: string): Promise<Post | null> {
	// Check cache first
	const cacheKey = `${lang}/${slug}`;
	if (postCache.has(cacheKey)) {
		return postCache.get(cacheKey)!;
	}

	try {
		const files = import.meta.glob('/src/content/blog/**/*.{md,mdx}', {
			eager: true,
			query: '?raw',
			import: 'default'
		});

		let content;
		for (const [path, moduleContent] of Object.entries(files)) {
			if (path.includes(`/${lang}/`) && path.includes(slug)) {
				content = moduleContent;
				break;
			}
		}

		if (!content) {
			return null;
		}

		// Extract frontmatter and content
		const [, frontmatterContent, markdown] =
			content.match(/---\n([\s\S]*?)\n---\n?([\s\S]*)/) || [];
		if (!frontmatterContent || !markdown) {
			throw new Error('Invalid post format');
		}

		// Parse frontmatter
		const metadata = YAML.parse(frontmatterContent);

		// Remove script tags and imports
		const cleanMarkdown = markdown
			.replace(/<script[\s\S]*?<\/script>/g, '')
			.replace(/^import.*$/gm, '')
			.trim();

		// Compile MDX
		const result = await compile(cleanMarkdown, {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
		});

		if (!result?.code) {
			throw new Error('Failed to compile MDX content');
		}

		const post: Post = {
			slug,
			title: metadata.title || slug,
			description: metadata.description || '',
			date: metadata.date || new Date().toISOString(),
			published: metadata.published ?? false,
			content: cleanMarkdown,
			author: metadata.author,
			tags: metadata.tags || [],
			thumbnail: metadata.thumbnail
		};

		// Cache the post
		postCache.set(cacheKey, post);

		return post;
	} catch (error) {
		console.error(`Error loading post ${slug}:`, error);
		return null;
	}
}

export async function loadAllPosts(lang: string): Promise<Post[]> {
	const files = import.meta.glob('/src/content/blog/**/*.{md,mdx}', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	const posts = Object.entries(files)
		.filter(([path]) => path.includes(`/blog/${lang}/`))
		.map(([path, content]) => {
			const [, frontmatter] = (content as string).match(/---\n([\s\S]*?)\n---/) || [];
			if (!frontmatter) return null;
			const metadata = YAML.parse(frontmatter);
			return {
				slug: path
					.split('/')
					.pop()
					?.replace(/\.(md|mdx)$/, ''),
				title: metadata.title,
				description: metadata.description,
				date: metadata.date,
				published: metadata.published,
				author: metadata.author,
				tags: metadata.tags,
				thumbnail: metadata.thumbnail
			};
		})
		.filter((post): post is NonNullable<typeof post> => post !== null && post.published === true)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}
