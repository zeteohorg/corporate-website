import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkDirective from 'remark-directive';
import remarkCallouts from './src/lib/utils/remark-callouts.js';

const config = {
	extensions: ['.svx', '.md', '.mdx'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [remarkGfm, remarkDirective, remarkCallouts],
	rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
};

export default config;
