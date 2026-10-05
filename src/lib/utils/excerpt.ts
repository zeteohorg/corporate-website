/**
 * Builds a meta description from a post's markdown body, for posts whose
 * frontmatter has no `description`. Strips markdown/MDX syntax and cuts at a
 * sentence boundary near the length search results show (≈110 chars for
 * Japanese, ≈155 for English).
 */
export function excerptFromMarkdown(markdown: string, lang: string): string {
	const max = lang === 'ja' ? 110 : 155;

	const text = markdown
		.replace(/^---\n[\s\S]*?\n---/, '') // frontmatter, if still present
		.replace(/```[\s\S]*?```/g, ' ') // code blocks
		.replace(/<[^>]+>/g, ' ') // HTML / MDX components
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → text
		.replace(/^\s{0,3}#{1,6}\s+.*$/gm, ' ') // headings
		.replace(/^\s*(?:[-*+●•]|\d+\.)\s+/gm, '') // list markers
		.replace(/[*_`>|~]/g, '') // emphasis, code, quotes, tables
		.replace(/\s+/g, ' ')
		.trim();

	if (text.length <= max) return text;

	const cut = text.slice(0, max);
	const sentenceEnd = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('. '));
	// Keep a whole sentence if it isn't too short; otherwise cut and add an ellipsis.
	if (sentenceEnd >= max * 0.5) return cut.slice(0, sentenceEnd + 1).trim();
	return `${cut.trimEnd()}…`;
}
