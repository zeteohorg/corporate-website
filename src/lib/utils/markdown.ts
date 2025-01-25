export async function loadMarkdownFiles(path: string) {
	const modules = import.meta.glob('/src/content/**/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	const posts = Object.entries(modules)
		.filter(([filename]) => filename.includes(path))
		.map(([filename, content]: [string, string]) => {
			const metadata = content.match(/---\n([\s\S]*?)\n---/)?.[1];
			const parsedMetadata =
				metadata?.split('\n').reduce(
					(acc, line) => {
						const [key, ...value] = line.split(':');
						if (key && value) {
							acc[key.trim()] = value.join(':').trim().replace(/['"]/g, '');
						}
						return acc;
					},
					{} as Record<string, string>
				) || {};

			return {
				slug: filename.split('/').pop()?.slice(0, -3),
				title: parsedMetadata.title || filename,
				description: parsedMetadata.description || '',
				date: parsedMetadata.date || new Date().toISOString(),
				published: parsedMetadata.published === 'true'
			};
		})
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}
