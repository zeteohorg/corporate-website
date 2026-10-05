<script lang="ts">
	import Hero from '$lib/components/team/Hero.svelte';
	import Team from '$lib/components/team/Team.svelte';
	import CompanyInfo from './CompanyInfo.svelte';
	import CompanyFuture from './CompanyFuture.svelte';
	import { SITE_ORIGIN } from '$lib/origin';
	export let data;
	const { translations: t, lang } = data;
	const canonicalUrl = `${SITE_ORIGIN}/${lang}/company/`;
</script>

<svelte:head>
	<title>{t.company.meta.title} | Zeteoh</title>
	<meta name="description" content={t.company.meta.description} />
	<meta property="og:title" content={t.company.meta.title} />
	<meta property="og:description" content={t.company.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{SITE_ORIGIN}/og/og-default.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:url" content={canonicalUrl} />
	<link rel="canonical" href={canonicalUrl} />
</svelte:head>

<div class="w-full">
	<Hero
		title={t.company.hero.title}
		subtitle={t.company.hero.subtitle}
		wearableTitle={t.company.hero.wearableTitle}
		wearableDescription={t.company.hero.wearableDescription}
	/>
	<CompanyFuture future={t.company.future} />
	<Team translations={t.company.team} />
	<CompanyInfo />
</div>
