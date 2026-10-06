<script lang="ts">
	import Hero from '$lib/components/top/Hero.svelte';
	import Stats from '$lib/components/top/Stats.svelte';
	import BackedBy from '$lib/components/home/BackedBy.svelte';
	import Problem from '$lib/components/top/Problem.svelte';
	import Products from '$lib/components/top/Products.svelte';
	import Astra from '$lib/components/top/Astra.svelte';
	import Benefits from '$lib/components/top/Benefits.svelte';
	import Export from '$lib/components/home/Export.svelte';
	import HowItWorks from '$lib/components/home/HowItWorks.svelte';
	import Evidence from '$lib/components/top/Evidence.svelte';
	import Vision from '$lib/components/top/Vision.svelte';
	import PocSection from '$lib/components/top/PocSection.svelte';
	import News from '$lib/components/top/News.svelte';
	import StickyCta from '$lib/components/top/StickyCta.svelte';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { SITE_ORIGIN } from '$lib/origin';

	let { data } = $props();
	const currentLanguage = $derived($page.params.lang);
	const t = $derived(translations[currentLanguage]);
	const canonicalUrl = $derived(`${SITE_ORIGIN}/${currentLanguage}/`);
</script>

<svelte:head>
	<title>{t.top.meta.title}</title>
	<meta name="description" content={t.top.meta.description} />
	<meta property="og:title" content={t.top.meta.ogTitle} />
	<meta property="og:description" content={t.top.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{SITE_ORIGIN}{t.top.meta.ogImage}" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content={canonicalUrl} />
	<link rel="canonical" href={canonicalUrl} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Hero />
<Stats />
<BackedBy />
<Problem />
<Products />
<Astra />
<Benefits />
<Export />
<HowItWorks />
<Evidence />
<Vision />
<PocSection />
<News newsPosts={data.newsPosts ?? []} blogPosts={data.blogPosts ?? []} />
<StickyCta />
