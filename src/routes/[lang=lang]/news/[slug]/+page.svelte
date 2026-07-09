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
	import { getMeta } from '$lib/meta';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { SITE_ORIGIN } from '$lib/origin';

	export let data;
	const { metadata, html, content, previousPost, nextPost, alternateLang } = data;
	const lang = $page.params.lang;
	const t = translations[lang];
	$: pageUrl = `${SITE_ORIGIN}/${lang}/news/${$page.params.slug}`;

	$: fullMeta = getMeta({
		defaultTitle: 'Zeteoh',
		defaultDescription:
			"Powered by Spatial AI — real-time motion analytics from your team's smartphones.",
		defaultOGImage: '/socialcard.jpeg',
		routeMeta: data.meta,
		pageParam: undefined,
		url: $page.url
	});

	$: articleSchema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: metadata.title,
		description: metadata.description,
		image: fullMeta.ogImage,
		datePublished: metadata.date,
		dateModified: metadata.updated ?? metadata.date,
		...(metadata.author ? { author: { '@type': 'Person', name: metadata.author.name } } : {}),
		publisher: {
			'@type': 'Organization',
			name: 'Zeteoh, Inc.',
			logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/images/kana-logo-bl.png` }
		}
	};

	$: breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/${lang}` },
			{
				'@type': 'ListItem',
				position: 2,
				name: t.news.title,
				item: `${SITE_ORIGIN}/${lang}/news`
			},
			{ '@type': 'ListItem', position: 3, name: metadata.title, item: pageUrl }
		]
	};

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
	<title>{fullMeta.title}</title>
	<meta name="description" content={fullMeta.description} />
	<meta property="og:title" content={fullMeta.ogTitle} />
	<meta property="og:description" content={fullMeta.ogDescription} />
	<meta property="og:image" content={fullMeta.ogImage} />
	<meta property="og:type" content={fullMeta.ogType} />
	<meta property="og:url" content={fullMeta.ogUrl} />
	<link rel="canonical" href={fullMeta.canonicalUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="alternate" hreflang={lang} href={pageUrl} />
	{#if alternateLang}
		<link
			rel="alternate"
			hreflang={alternateLang}
			href={`${SITE_ORIGIN}/${alternateLang}/news/${$page.params.slug}`}
		/>
	{/if}
	<JsonLd schema={articleSchema} />
	<JsonLd schema={breadcrumbSchema} />
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
			<div class="text-muted-foreground mb-4 flex items-center text-sm">
				<Calendar class="mr-2 h-4 w-4" />
				<time datetime={metadata.date}>
					{new Date(metadata.date).toLocaleDateString(lang, {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
				{#if metadata.updated && metadata.updated !== metadata.date}
					<span class="mx-2">·</span>
					<time datetime={metadata.updated}>
						{lang === 'ja' ? '更新: ' : 'Updated '}
						{new Date(metadata.updated).toLocaleDateString(lang, {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</time>
				{/if}
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

		<div class="article-content prose prose-lg dark:prose-invert max-w-none text-base">
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
