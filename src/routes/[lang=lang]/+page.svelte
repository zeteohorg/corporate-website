<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import Stats from '$lib/components/home/Stats.svelte';
	import BackedBy from '$lib/components/home/BackedBy.svelte';
	import Export from '$lib/components/home/Export.svelte';
	import UseCases from '$lib/components/home/UseCases.svelte';
	import Challenges from '$lib/components/home/Challenges.svelte';
	import LatestPosts from '$lib/components/home/LatestPosts.svelte';
	import ContactForm from '$lib/components/home/ContactForm.svelte';
	import Product from '$lib/components/home/Product.svelte';
	import HowItWorks from '$lib/components/home/HowItWorks.svelte';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	let { data } = $props();
	const currentLanguage = $derived($page.params.lang);
	const t = $derived(translations[currentLanguage]);
	const origin = $derived($page.url.origin);
	const canonicalUrl = $derived(`${origin}/${currentLanguage}/`);
</script>

<svelte:head>
	{#if currentLanguage === 'en'}
		<title>TRAILS — Real-Time Motion Analytics for Factories | Zeteoh</title>
		<meta
			name="description"
			content="Powered by Spatial AI — real-time motion analytics from your team's smartphones. No sensors. No infrastructure. Results in days."
		/>
		<meta property="og:title" content="TRAILS — Real-Time Motion Analytics for Factories" />
		<meta
			property="og:description"
			content="Powered by Spatial AI — real-time motion analytics from your team's smartphones. No sensors. No infrastructure. Results in days."
		/>
	{:else}
		<title>TRAILS — リアルタイム動線分析 | Zeteoh</title>
		<meta
			name="description"
			content="Spatial AI が現場を変える——スマートフォンだけでリアルタイムの動線分析を実現。センサー不要、インフラ不要、環境を選ばない。"
		/>
		<meta property="og:title" content="TRAILS — リアルタイム動線分析" />
		<meta
			property="og:description"
			content="Spatial AI が現場を変える——スマートフォンだけでリアルタイムの動線分析を実現。センサー不要、インフラ不要、環境を選ばない。"
		/>
	{/if}
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{origin}/socialcard.jpeg" />
	<meta property="og:url" content={canonicalUrl} />
	<link rel="canonical" href={canonicalUrl} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Hero />
<Stats />
<BackedBy />
<Export />
<Challenges />
<Product />
<HowItWorks />
<UseCases />
<ContactForm />
{#if data.blogPosts?.length > 0}
	<LatestPosts posts={data.blogPosts} type="blog" />
{/if}
{#if data.newsPosts?.length > 0}
	<LatestPosts posts={data.newsPosts} type="news" />
{/if}
