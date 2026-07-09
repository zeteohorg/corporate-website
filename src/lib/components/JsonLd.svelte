<script lang="ts">
	let { schema }: { schema: Record<string, unknown> } = $props();

	const LINE_SEPARATOR = String.fromCharCode(0x2028);
	const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029);

	// Escape `<` so injected content (e.g. a post title containing a closing
	// script tag) can never break out of the script element below; the
	// line/paragraph separator escapes guard against this value ever being
	// consumed as a JS string literal.
	const json = $derived(
		JSON.stringify(schema)
			.split('<')
			.join('\\u003c')
			.split(LINE_SEPARATOR)
			.join('\\u2028')
			.split(PARAGRAPH_SEPARATOR)
			.join('\\u2029')
	);

	// The open/close tags are split across concatenated string literals so the
	// literal substrings "<script" / "</script" never appear in this file's
	// source — Svelte's parser treats those as real tag boundaries even inside
	// a string, which breaks compilation of this very component.
	const openTag = '<' + 'script type="application/ld+json">';
	const closeTag = '<' + '/scr' + 'ipt>';
	const scriptHtml = $derived(openTag + json + closeTag);
</script>

{@html scriptHtml}
