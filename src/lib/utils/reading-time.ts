export function formatReadingTime(content: string, locale: string = 'en'): string {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);

	if (locale === 'ja') {
		return `約${minutes}分で読めます`;
	}

	return `${minutes} min read`;
}
