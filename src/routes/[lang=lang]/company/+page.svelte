<script lang="ts">
	import Hero from '$lib/components/team/Hero.svelte';
	import Team from '$lib/components/team/Team.svelte';
	import CompanyInfo from './CompanyInfo.svelte';
	import CompanyFuture from './CompanyFuture.svelte';
	import { SITE_ORIGIN } from '$lib/origin';
	export let data;
	const { translations: t, lang } = data;
	const canonicalUrl = `${SITE_ORIGIN}/${lang}/company`;
</script>

<svelte:head>
	<title>{t.company.hero.title} | Zeteoh</title>
	<meta name="description" content={t.company.future.description} />
	<meta property="og:title" content={t.company.hero.title} />
	<meta property="og:description" content={t.company.future.description} />
	<meta property="og:type" content="website" />
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
