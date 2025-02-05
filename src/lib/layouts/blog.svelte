<script lang="ts">
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { translations } from '$lib/i18n/translations';
	import { formatReadingTime } from '$lib/utils/reading-time';
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { ArrowLeft, ArrowRight, Share2, Calendar } from 'lucide-svelte';
	import TableOfContents from '$lib/components/blog/TableOfContents.svelte';
	import AuthorCard from '$lib/components/blog/AuthorCard.svelte';
	import type { TableOfContentsItem } from '$lib/types';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let { metadata, previousPost, nextPost, children } = $props<{
		metadata: {
			title: string;
			description: string;
			date: string;
			content?: string;
			author?: {
				id: string;
				name: string;
				avatar: string;
				bio: {
					en: string;
					ja: string;
				};
				title?: {
					en: string;
					ja: string;
				};
				social?: {
					twitter?: string;
					github?: string;
					linkedin?: string;
				};
			};
			tags?: string[];
			thumbnail?: {
				url: string;
				alt: string;
			};
		};
		previousPost?: { slug: string; title: string };
		nextPost?: { slug: string; title: string };
		children?: any;
	}>();

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage]);

	const readingTime = $derived(() => {
		return metadata.content ? formatReadingTime(metadata.content, currentLanguage) : '';
	});

	const toc = $derived<TableOfContentsItem[]>(() => {
		if (!metadata.content) return [];
		const headings = metadata.content.match(/^#{2,3}\s+.+$/gm) || [];
		return headings.map((heading) => {
			const level = heading.match(/^#{2,3}/)?.[0].length || 2;
			const title = heading.replace(/^#{2,3}\s+/, '');
			const id = title.toLowerCase().replace(/[^\w]+/g, '-');
			return { level, title, id };
		});
	});

	async function shareArticle() {
		const url = `${PUBLIC_SITE_URL}${$page.url.pathname}`;
		if (navigator.share) {
			await navigator.share({
				title: metadata.title,
				text: metadata.description,
				url
			});
		} else {
			await navigator.clipboard.writeText(url);
		}
	}
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	{#if metadata.thumbnail}
		<meta property="og:image" content={metadata.thumbnail.url} />
	{/if}
	<meta property="og:url" content={`${PUBLIC_SITE_URL}${$page.url.pathname}`} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
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
				<Breadcrumb.Page>{metadata.title}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<div class="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
		<article class="prose prose-slate mx-auto max-w-3xl dark:prose-invert lg:mx-0">
			<header class="not-prose mb-8">
				<h1 class="mb-4 text-4xl font-bold">{metadata.title}</h1>
				<div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
					{#if metadata.author}
						<div class="flex items-center gap-2">
							<img
								src={metadata.author.avatar}
								alt={metadata.author.name}
								class="size-8 rounded-full"
								width={32}
								height={32}
							/>
							<span>{metadata.author.name}</span>
						</div>
					{/if}
					<div class="flex items-center gap-1">
						<Calendar class="size-4" />
						<time datetime={metadata.date}>
							{new Date(metadata.date).toLocaleDateString(currentLanguage, {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
					</div>
					<div>·</div>
					{#if readingTime}
						<div>{readingTime}</div>
					{/if}
					<button
						onclick={shareArticle}
						class={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-1')}
						aria-label="Share article"
					>
						<Share2 class="size-4" />
						Share
					</button>
				</div>
			</header>

			{#if metadata.thumbnail}
				<img
					src={metadata.thumbnail.url}
					alt={metadata.thumbnail.alt}
					class="mb-8 w-full rounded-lg"
					width={800}
					height={400}
				/>
			{/if}

			<div class="mdsvex">
				{@render children?.()}
			</div>

			{#if metadata.tags}
				<div class="not-prose mt-8">
					<div class="flex flex-wrap gap-2">
						{#each metadata.tags as tag}
							<a
								href="/{currentLanguage}/blog/tag/{tag}"
								class={buttonVariants({ variant: 'secondary', size: 'sm' })}
							>
								{tag}
							</a>
						{/each}
					</div>
				</div>
			{/if}

			{#if metadata.author}
				<div class="not-prose mt-12">
					<AuthorCard author={metadata.author} />
				</div>
			{/if}

			<nav class="not-prose mt-12 flex justify-between">
				{#if previousPost}
					<a
						href="/{currentLanguage}/blog/{previousPost.slug}"
						class={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}
					>
						<ArrowLeft class="size-4" />
						{previousPost.title}
					</a>
				{:else}
					<div></div>
				{/if}

				{#if nextPost}
					<a
						href="/{currentLanguage}/blog/{nextPost.slug}"
						class={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}
					>
						{nextPost.title}
						<ArrowRight class="size-4" />
					</a>
				{/if}
			</nav>
		</article>

		<aside class="hidden lg:block">
			<div class="sticky top-24 space-y-8">
				<TableOfContents items={toc} />
			</div>
		</aside>
	</div>
</div>
