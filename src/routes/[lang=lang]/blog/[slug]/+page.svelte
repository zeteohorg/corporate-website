<script lang="ts">
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	import { mountMDXComponents } from '$lib/mount-mdx';
	import type { PageData } from './$types';
	import { formatReadingTime } from '$lib/utils/reading-time';
	import { authors } from '$lib/data/authors';
	import { Alert, AlertTitle } from '$lib/components/ui/alert';
	import AuthorCard from '$lib/components/blog/AuthorCard.svelte';
	import TableOfContents from '$lib/components/blog/TableOfContents.svelte';

	// Import MDX components lazily
	const mdxComponents = {
		CodeBlock: () => import('$lib/components/mdx/CodeBlock.svelte'),
		ImageGallery: () => import('$lib/components/mdx/ImageGallery.svelte'),
		Blockquote: () => import('$lib/components/mdx/Blockquote.svelte'),
		Table: () => import('$lib/components/mdx/Table.svelte'),
		VideoEmbed: () => import('$lib/components/mdx/VideoEmbed.svelte'),
		Callout: () => import('$lib/components/mdx/Callout.svelte')
	};

	export let data: PageData;

	let post: any = null;
	let loadError: Error | null = null;
	let toc: any[] = [];
	let contentElement: HTMLElement;

	onMount(async () => {
		try {
			const response = await fetch(`/content/blog/${data.params.lang}/${data.params.slug}.mdx`);
			if (!response.ok) throw error(404, 'Post not found');

			const content = await response.text();

			// Process MDX on the client
			const mdxResponse = await fetch('/api/mdx', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content })
			});

			const { html, metadata } = await mdxResponse.json();

			post = {
				...metadata,
				html,
				slug: data.params.slug
			};

			await new Promise((resolve) => setTimeout(resolve, 0));
			if (contentElement) {
				// Load all MDX components before mounting
				const loadedComponents = await Promise.all(
					Object.entries(mdxComponents).map(async ([name, loader]) => {
						const component = await loader();
						return [name, component.default];
					})
				);

				mountMDXComponents(contentElement, Object.fromEntries(loadedComponents));
			}
		} catch (e) {
			loadError = e as Error;
			console.error('Error loading post:', e);
		}
	});
</script>

<svelte:head>
	{#if loadState.post}
		<title>{loadState.post.title}</title>
		<meta name="description" content={loadState.post.description} />
		{#if loadState.post.thumbnail}
			<meta property="og:image" content={loadState.post.thumbnail.url} />
			<meta name="twitter:image" content={loadState.post.thumbnail.url} />
			<meta name="twitter:card" content="summary_large_image" />
		{/if}
	{/if}
</svelte:head>

<div class="container mx-auto px-4 py-8">
	{#if loadState.loading}
		<div class="flex h-64 items-center justify-center">
			<div class="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
		</div>
	{:else if loadState.errorMsg}
		<div class="text-center text-red-500">{loadState.errorMsg}</div>
	{:else if loadState.post}
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
			<div>
				<!-- Breadcrumb -->
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<a href="/{lang}">{translations[lang].common.nav.home}</a>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<a href="/{lang}/blog">{translations[lang].blog.title}</a>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							{loadState.post.title}
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<!-- Article -->
				<article class="prose mt-8 max-w-none dark:prose-invert">
					<h1>{loadState.post.title}</h1>

					<div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
						<time datetime={loadState.post.date}>
							{new Date(loadState.post.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
						<span>·</span>
						<span>{formatReadingTime(loadState.post.content, lang)}</span>
					</div>

					{#if loadState.post.thumbnail}
						<img
							src={loadState.post.thumbnail.url}
							alt={loadState.post.thumbnail.alt}
							class="my-8 w-full rounded-lg"
						/>
					{/if}

					<div id="post-content">
						{@html loadState.post.html}
					</div>
				</article>

				<!-- Author -->
				{#if loadState.post.author && authors[loadState.post.author.id]}
					<div class="mt-12">
						<AuthorCard author={authors[loadState.post.author.id]} />
					</div>
				{/if}

				<!-- Navigation -->
				<nav class="mt-12 flex justify-between">
					{#if loadState.previousPost}
						<Card>
							<a href="/{lang}/blog/{loadState.previousPost.slug}" class="block p-4">
								<span class="text-sm text-gray-500">← Previous</span>
								<p class="mt-1">{loadState.previousPost.title}</p>
							</a>
						</Card>
					{:else}
						<div></div>
					{/if}

					{#if loadState.nextPost}
						<Card>
							<a href="/{lang}/blog/{loadState.nextPost.slug}" class="block p-4 text-right">
								<span class="text-sm text-gray-500">Next →</span>
								<p class="mt-1">{loadState.nextPost.title}</p>
							</a>
						</Card>
					{/if}
				</nav>
			</div>

			<!-- Sidebar -->
			<div class="lg:sticky lg:top-8">
				<TableOfContents toc={loadState.toc} />

				{#if loadState.post.tags && loadState.post.tags.length > 0}
					<div class="mt-8">
						<h3 class="mb-4 font-semibold">Tags</h3>
						<div class="flex flex-wrap gap-2">
							{#each loadState.post.tags as tag}
								<a
									href="/{lang}/blog/tag/{tag}"
									class="rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
								>
									{tag}
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
