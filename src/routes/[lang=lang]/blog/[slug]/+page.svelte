<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { translations } from '$lib/i18n/translations';
	import { formatReadingTime } from '$lib/utils/reading-time';
	import { onMount } from 'svelte';
	import { mount } from 'svelte';

	// Import MDX components
	import CodeBlock from '$lib/components/mdx/CodeBlock.svelte';
	import Blockquote from '$lib/components/mdx/Blockquote.svelte';
	import Table from '$lib/components/mdx/Table.svelte';
	import ImageGallery from '$lib/components/mdx/ImageGallery.svelte';
	import VideoEmbed from '$lib/components/mdx/VideoEmbed.svelte';
	import Callout from '$lib/components/mdx/Callout.svelte';

	let { data } = $props<{ data: PageData }>();
	const currentLanguage = $derived($page.params.lang);
	const t = $derived(translations[currentLanguage]);

	const readingTime = $derived(() => {
		return data.content ? formatReadingTime(data.content, currentLanguage) : '';
	});

	onMount(() => {
		if (typeof window !== 'undefined') {
			const content = document.querySelector('.mdsvex-content');
			if (!content) return;

			// Mount custom components
			content.querySelectorAll('mdx-code-block').forEach((el) => {
				const props = Object.fromEntries(
					Array.from(el.attributes).map((attr) => [attr.name, tryParseJSON(attr.value)])
				);
				mount(CodeBlock, { target: el, props });
			});

			content.querySelectorAll('mdx-blockquote').forEach((el) => {
				mount(Blockquote, { target: el, props: { children: el.innerHTML } });
			});

			content.querySelectorAll('mdx-table').forEach((el) => {
				mount(Table, { target: el, props: { children: el.innerHTML } });
			});

			content.querySelectorAll('mdx-gallery').forEach((el) => {
				const props = Object.fromEntries(
					Array.from(el.attributes).map((attr) => [attr.name, tryParseJSON(attr.value)])
				);
				mount(ImageGallery, { target: el, props });
			});

			content.querySelectorAll('mdx-video').forEach((el) => {
				const props = Object.fromEntries(
					Array.from(el.attributes).map((attr) => [attr.name, tryParseJSON(attr.value)])
				);
				mount(VideoEmbed, { target: el, props });
			});

			content.querySelectorAll('mdx-callout').forEach((el) => {
				const props = Object.fromEntries(
					Array.from(el.attributes).map((attr) => [attr.name, tryParseJSON(attr.value)])
				);
				props.children = el.innerHTML;
				mount(Callout, { target: el, props });
			});
		}
	});

	function tryParseJSON(value: string) {
		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/{currentLanguage}">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/{currentLanguage}/blog">{t.blog.title}</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>{data.metadata.title}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<article class="prose prose-slate mx-auto max-w-3xl dark:prose-invert">
		<header class="not-prose mb-8">
			<h1 class="mb-4 text-4xl font-bold">{data.metadata.title}</h1>
			<div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
				{#if data.metadata.author}
					<div class="flex items-center gap-2">
						<div class="size-8 rounded-full bg-muted" aria-label={data.metadata.author.name}></div>
						<span>{data.metadata.author.name}</span>
					</div>
				{/if}
				<time datetime={data.metadata.date}>
					{new Date(data.metadata.date).toLocaleDateString(currentLanguage, {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
				{#if readingTime}
					<div>·</div>
					<div>{readingTime}</div>
				{/if}
			</div>
		</header>

		{#if data.metadata?.thumbnail}
			<img
				src={data.metadata.thumbnail.url}
				alt={data.metadata.thumbnail.alt}
				class="mb-8 w-full rounded-lg"
				width={800}
				height={400}
			/>
		{/if}

		<div class="mdsvex-content">
			{@html data.html}
		</div>

		{#if data.metadata.tags}
			<div class="not-prose mt-8">
				<div class="flex flex-wrap gap-2">
					{#each data.metadata.tags as tag}
						<a
							href="/{currentLanguage}/blog/tag/{tag}"
							class="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground hover:bg-secondary/80"
						>
							{tag}
						</a>
					{/each}
				</div>
			</div>
		{/if}

		{#if data.metadata.author}
			<div class="not-prose mt-12 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
				<div class="flex gap-4">
					<div class="size-16 rounded-full bg-muted" aria-label={data.metadata.author.name}></div>
					<div>
						<h2 class="text-lg font-semibold">{data.metadata.author.name}</h2>
						<p class="mt-2 text-sm text-muted-foreground">{data.metadata.author.bio}</p>
					</div>
				</div>
			</div>
		{/if}

		<nav class="not-prose mt-12 flex justify-between">
			{#if data.previousPost}
				<a
					href="/{currentLanguage}/blog/{data.previousPost.slug}"
					class="flex items-center gap-2 text-muted-foreground hover:text-foreground"
				>
					← {data.previousPost.title}
				</a>
			{:else}
				<div></div>
			{/if}

			{#if data.nextPost}
				<a
					href="/{currentLanguage}/blog/{data.nextPost.slug}"
					class="flex items-center gap-2 text-muted-foreground hover:text-foreground"
				>
					{data.nextPost.title} →
				</a>
			{/if}
		</nav>
	</article>
</div>
