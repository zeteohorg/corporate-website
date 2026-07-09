<script lang="ts">
	import { page } from '$app/stores';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { SITE_ORIGIN } from '$lib/origin';

	let { children } = $props();

	// Per-slug content routes (blog/news posts) aren't guaranteed to exist in
	// both languages, so they compute their own conditional hreflang tags in
	// their own +page.svelte instead of the unconditional ones emitted here.
	const isPerSlugContentRoute = $derived(
		$page.route.id?.includes('/blog/[slug]') || $page.route.id?.includes('/news/[slug]')
	);

	const pathWithoutLangPrefix = $derived($page.url.pathname.replace(/^\/(en|ja)/, ''));

	const organizationSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Zeteoh, Inc.',
		alternateName: ['zeteoh', 'zeteoh株式会社'],
		url: SITE_ORIGIN,
		logo: `${SITE_ORIGIN}/images/kana-logo-bl.png`,
		sameAs: ['https://x.com/zeteoh_ai', 'https://jp.linkedin.com/company/zeteoh']
	});
</script>

<svelte:head>
	<JsonLd schema={organizationSchema} />
	{#if !isPerSlugContentRoute}
		<link rel="alternate" hreflang="en" href={`${SITE_ORIGIN}/en${pathWithoutLangPrefix}`} />
		<link rel="alternate" hreflang="ja" href={`${SITE_ORIGIN}/ja${pathWithoutLangPrefix}`} />
		<link rel="alternate" hreflang="x-default" href={`${SITE_ORIGIN}/en${pathWithoutLangPrefix}`} />
	{/if}
</svelte:head>

{@render children?.()}
