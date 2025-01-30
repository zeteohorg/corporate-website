export async function loadMarkdownFiles(path: string) {
	console.log(`Loading markdown files from path: ${path}`);

	// Fix the glob pattern to correctly match content directory
	const modules = import.meta.glob('/src/content/**/*.{md,mdx}', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	console.log('Available module paths:', Object.keys(modules));

	const filteredFiles = Object.entries(modules).filter(([filename]) => filename.includes(path));

	console.log(
		`Filtered files for ${path}:`,
		filteredFiles.map(([f]) => f)
	);

	const posts = filteredFiles
		.map(([filename, content]: [string, string]) => {
			try {
				const metadata = content.match(/---\n([\s\S]*?)\n---/)?.[1];
				if (!metadata) {
					console.warn(`No metadata found in ${filename}`);
					return null;
				}

				const parsedMetadata = metadata.split('\n').reduce(
					(acc, line) => {
						const [key, ...value] = line.split(':');
						if (key && value) {
							const processedValue = value.join(':').trim().replace(/['"]/g, '');
							if (key.trim() === 'thumbnail') {
								try {
									acc[key.trim()] = JSON.parse(processedValue);
								} catch (e) {
									console.warn(`Invalid thumbnail JSON in ${filename}:`, e);
								}
							} else {
								acc[key.trim()] = processedValue;
							}
						}
						return acc;
					},
					{} as Record<string, any>
				);

				// Clean the slug
				const rawSlug = filename
					.split('/')
					.pop()
					?.replace(/\.(md|mdx)$/, '');
				const cleanSlug = rawSlug?.replace(/\./g, '');

				const post = {
					slug: cleanSlug,
					title: parsedMetadata.title || filename,
					description: parsedMetadata.description || '',
					date: parsedMetadata.date || new Date().toISOString(),
					published: parsedMetadata.published === 'true',
					thumbnail: parsedMetadata.thumbnail || undefined
				};

				console.log(`Processed post from ${filename}:`, post);
				return post;
			} catch (error) {
				console.error(`Error processing ${filename}:`, error);
				return null;
			}
		})
		.filter((post): post is NonNullable<typeof post> => {
			const isValid = post !== null && post.published;
			if (!isValid) {
				console.log('Filtered out post:', post);
			}
			return isValid;
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	console.log(`Final processed posts for ${path}:`, posts);
	return posts;
}
