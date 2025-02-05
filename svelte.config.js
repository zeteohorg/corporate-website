import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import adapter from '@sveltejs/adapter-netlify';

const LANGUAGES = ['en', 'ja'];
const ROUTES = ['', 'blog', 'news', 'company', 'privacy-policy'];

function generateEntries() {
	const entries = ['*'];

	// Add language root paths
	LANGUAGES.forEach((lang) => {
		entries.push(`/${lang}`);
	});

	// Add all static routes with language prefixes
	LANGUAGES.forEach((lang) => {
		ROUTES.forEach((route) => {
			entries.push(`/${lang}/${route}`);
		});
	});

	return entries;
}

const config = {
	kit: {
		adapter: adapter({
			edge: false,
			split: true
		}),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Don't fail build on 404s for nested routes
				if (message.includes('404') && path.includes('/[slug]')) {
					return;
				}
				throw new Error(`${message} (${path})${referrer ? ` (linked from ${referrer})` : ''}`);
			},
			entries: generateEntries(),
			crawl: true,
			handleMissingId: 'ignore'
		},
		alias: {
			$lib: 'src/lib'
		}
	},
	extensions: ['.svelte', '.md', '.mdx'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.mdx'],
			rehypePlugins: [rehypeSlug, rehypeUnwrapImages],
			remarkPlugins: [remarkToc],
			layout: {
				blog: './src/lib/layouts/blog.svelte',
				news: './src/lib/layouts/news.svelte'
			},
			smartypants: {
				dashes: 'oldschool'
			},
			frontmatter: {
				marker: '-',
				type: 'yaml'
			}
		})
	]
};

export default config;
