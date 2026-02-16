<!-- FIXME
The blog.svelte layout isn't being used at all - instead, 
the blog post content is being rendered directly in +page.svelte. 
The Author Card component isn't working because it's 
actually redundant - the author info is already being 
rendered directly in the page. -->
<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { translations } from '$lib/i18n/translations';
	import { formatReadingTime } from '$lib/utils/reading-time';
	import { onMount } from 'svelte';
	import { mountMDXComponents } from '$lib/mount-mdx';
	import CodeBlock from '$lib/components/mdx/CodeBlock.svelte';
	import Blockquote from '$lib/components/mdx/Blockquote.svelte';
	import Table from '$lib/components/mdx/Table.svelte';
	import ImageGallery from '$lib/components/mdx/ImageGallery.svelte';
	import VideoEmbed from '$lib/components/mdx/VideoEmbed.svelte';
	import Callout from '$lib/components/mdx/Callout.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';

	let { data } = $props<{ data: PageData }>();
	const currentLanguage = $derived($page.params.lang);
	const t = $derived(translations[currentLanguage]);
	const readingTime = $derived(
		data.content ? formatReadingTime(data.content, currentLanguage) : ''
	);

	const mdxComponents = {
		CodeBlock,
		Blockquote,
		Table,
		ImageGallery,
		VideoEmbed,
		Callout
	};

	onMount(() => {
		requestAnimationFrame(() => {
			const content = document.querySelector('.mdsvex-content');
			if (content instanceof HTMLElement) {
				mountMDXComponents(content, mdxComponents);
			}
		});
	});
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="pt-4 pb-8">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/{currentLanguage}">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator></Breadcrumb.Separator>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/{currentLanguage}/blog">{t.blog.title}</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator></Breadcrumb.Separator>
				<Breadcrumb.Item>
					<Breadcrumb.Page>{data.metadata.title}</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
	<article class="prose prose-slate dark:prose-invert mx-auto max-w-3xl">
		<header class="not-prose mb-8">
			<h1 class="mb-4 text-4xl font-bold">{data.metadata.title}</h1>
			<div class="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
				{#if data.metadata.author}
					<div class="flex items-center gap-2">
						<img
							src={data.metadata.author.avatar}
							alt={data.metadata.author.name}
							class="size-8 rounded-full"
							width={32}
							height={32}
						/>
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

		<!-- Use a container div for SSR matching -->
		<div class="mdsvex-content" data-hydration-container>
			{@html data.html}
		</div>

		{#if data.metadata.tags}
			<div class="not-prose mt-8">
				<div class="flex flex-wrap gap-2">
					{#each data.metadata.tags as tag}
						<a
							href="/{currentLanguage}/blog/tag/{tag}"
							class="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-3 py-1 text-sm"
						>
							{tag}
						</a>
					{/each}
				</div>
			</div>
		{/if}

		{#if data.metadata.author}
			<div class="not-prose bg-card text-card-foreground mt-12 rounded-lg border p-6 shadow-sm">
				<div class="flex gap-4">
					<img
						src={data.metadata.author.avatar}
						alt={data.metadata.author.name}
						class="size-16 rounded-full"
						width={64}
						height={64}
					/>
					<div>
						<h2 class="text-lg font-semibold">{data.metadata.author.name}</h2>
						{#if data.metadata.author.bio?.[currentLanguage]}
							<p class="text-muted-foreground mt-2 text-sm">
								{data.metadata.author.bio[currentLanguage]}
							</p>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		<nav class="not-prose mt-12 flex justify-between">
			{#if data.previousPost}
				<a
					href="/{currentLanguage}/blog/{data.previousPost.slug}"
					class={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}
				>
					<ArrowLeft class="size-4"></ArrowLeft>
					{data.previousPost.title}
				</a>
			{:else}
				<div></div>
			{/if}

			{#if data.nextPost}
				<a
					href="/{currentLanguage}/blog/{data.nextPost.slug}"
					class={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}
				>
					{data.nextPost.title}
					<ArrowRight class="size-4"></ArrowRight>
				</a>
			{/if}
		</nav>
	</article>
</div>
