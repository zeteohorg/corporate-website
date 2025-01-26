<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import UseCases from '$lib/components/home/UseCases.svelte';
	import Challenges from '$lib/components/home/Challenges.svelte';
	import LatestPosts from '$lib/components/home/LatestPosts.svelte';
	import ContactForm from '$lib/components/home/ContactForm.svelte';
	import Product from '$lib/components/home/Product.svelte';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	let { data } = $props();
	const currentLanguage = $derived($page.params.lang);
	const t = $derived(translations[currentLanguage]);
</script>

<Hero />
<UseCases />
<Challenges />
<Product />
{#if data.blogPosts?.length > 0}
	<LatestPosts posts={data.blogPosts} type="blog" />
{/if}
{#if data.newsPosts?.length > 0}
	<LatestPosts posts={data.newsPosts} type="news" />
{/if}
<ContactForm />
