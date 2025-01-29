import { promises as fs } from 'fs';
import path from 'path';
import * as YAML from 'yaml';

const CONTENT_DIR = 'src/content';
const OUTPUT_DIR = 'static/content';
const SUPPORTED_LANGS = ['en', 'ja'];

async function buildBlog() {
	try {
		// Ensure output directory exists
		await fs.mkdir(OUTPUT_DIR, { recursive: true });

		for (const lang of SUPPORTED_LANGS) {
			const blogDir = path.join(CONTENT_DIR, 'blog', lang);
			const outputBlogDir = path.join(OUTPUT_DIR, 'blog', lang);

			// Create language-specific output directory
			await fs.mkdir(outputBlogDir, { recursive: true });

			// Get all MDX files
			const files = await fs.readdir(blogDir);
			const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

			// Process each file
			const posts = [];

			for (const file of mdxFiles) {
				const content = await fs.readFile(path.join(blogDir, file), 'utf-8');

				// Extract and parse frontmatter
				const [, frontmatter] = content.match(/---\n([\s\S]*?)\n---/) || [];
				if (!frontmatter) continue;

				const metadata = YAML.parse(frontmatter);

				// Skip unpublished posts
				if (!metadata.published) continue;

				// Get slug from filename
				const slug = file.replace(/\.mdx$/, '');
				posts.push({
					slug,
					title: metadata.title,
					description: metadata.description,
					date: metadata.date,
					author: metadata.author,
					tags: metadata.tags,
					thumbnail: metadata.thumbnail
				});

				// Copy file to output directory
				await fs.copyFile(path.join(blogDir, file), path.join(outputBlogDir, file));
			}

			// Sort posts by date
			posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

			// Generate index file
			await fs.writeFile(path.join(outputBlogDir, 'index.json'), JSON.stringify(posts, null, 2));

			console.log(`Built ${posts.length} posts for language: ${lang}`);
		}

		console.log('Blog build completed successfully');
	} catch (error) {
		console.error('Error building blog:', error);
		process.exit(1);
	}
}

// Run the build
buildBlog();
