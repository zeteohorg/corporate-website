<script lang="ts">
	import { formatReadingTime } from '$lib/utils/reading-time';
	import { mountMDXComponents } from '$lib/mount-mdx';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { ChevronLeft, ChevronRight, Calendar } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { translations } from '$lib/i18n/translations';

	export let data;
	const { metadata, html, content, previousPost, nextPost } = data;
	const lang = $page.params.lang;
	const t = translations[lang];

	onMount(() => {
		// Mount MDX components
		const articleContent = document.querySelector('.article-content');
		if (articleContent instanceof HTMLElement) {
			mountMDXComponents(articleContent, {
				// Add your MDX components here
			});
		}
	});
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	{#if metadata.thumbnail}
		<meta property="og:image" content={metadata.thumbnail.url} />
	{/if}
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- Breadcrumbs -->
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/{lang}">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/{lang}/news">{t.news.title}</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>{metadata.title}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<!-- Article -->
	<article class="mx-auto mt-8 max-w-4xl">
		<header class="mb-8">
			<h1 class="mb-4 text-4xl font-bold">{metadata.title}</h1>
			<div class="mb-4 flex items-center text-sm text-muted-foreground">
				<Calendar class="mr-2 h-4 w-4" />
				<time datetime={metadata.date}>
					{new Date(metadata.date).toLocaleDateString(lang, {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
				<span class="mx-2">·</span>
				<span>{formatReadingTime(content, lang)}</span>
			</div>
			{#if metadata.thumbnail}
				<div class="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
					<img
						src={metadata.thumbnail.url}
						alt={metadata.thumbnail.alt}
						class="h-full w-full object-cover"
					/>
				</div>
			{/if}
		</header>

		<div class="article-content prose prose-lg max-w-none text-base dark:prose-invert">
			{@html html}
		</div>

		<!-- Author section if available -->
		{#if metadata.author}
			<Card.Root class="mt-16">
				<Card.Content class="flex items-center space-x-4 p-6">
					<img
						src={metadata.author.avatar}
						alt={metadata.author.name}
						class="h-16 w-16 rounded-full object-cover"
					/>
					<div>
						<Card.Title class="mb-2 text-xl">{metadata.author.name}</Card.Title>
						<Card.Description>
							{metadata.author.bio[lang]}
						</Card.Description>
					</div>
				</Card.Content>
			</Card.Root>
		{/if}
	</article>

	<!-- Navigation between posts -->
	<nav class="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4">
		{#if previousPost}
			<div>
				<Button
					variant="ghost"
					class="flex items-center space-x-2"
					href="/{lang}/news/{previousPost.slug}"
				>
					<ChevronLeft class="h-4 w-4" />
					<span class="text-sm">{previousPost.title}</span>
				</Button>
			</div>
		{:else}
			<div></div>
		{/if}

		{#if nextPost}
			<div class="text-right">
				<Button
					variant="ghost"
					class="ml-auto flex items-center space-x-2"
					href="/{lang}/news/{nextPost.slug}"
				>
					<span class="text-sm">{nextPost.title}</span>
					<ChevronRight class="h-4 w-4" />
				</Button>
			</div>
		{/if}
	</nav>
</div>
