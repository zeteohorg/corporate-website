<script lang="ts">
	import PrivacyPolicy from '$lib/components/PrivacyPolicy.svelte';
	import { translations } from '$lib/i18n/translations';
	import type { PageData } from './$types';
	import { SITE_ORIGIN } from '$lib/origin';

	export let data: PageData;
	const { lang } = data;
	const t = translations[lang].privacyPolicy;
	const canonicalUrl = `${SITE_ORIGIN}/${lang}/privacy-policy/`;
</script>

<svelte:head>
	<title>{t.title} | Zeteoh</title>
	<meta name="description" content={t.intro} />
	<meta property="og:title" content={t.title} />
	<meta property="og:description" content={t.intro} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{SITE_ORIGIN}/og/og-default.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:url" content={canonicalUrl} />
	<link rel="canonical" href={canonicalUrl} />
</svelte:head>

<PrivacyPolicy {t} />
