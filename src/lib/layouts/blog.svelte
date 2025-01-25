<script lang="ts">
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { translations } from '$lib/i18n/translations';
	import Callout from '$lib/components/mdx/Callout.svelte';

	let { children } = $props();
	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage]);
</script>

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
				<Breadcrumb.Page>{$page.data.metadata?.title}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<article class="prose prose-slate dark:prose-invert mx-auto max-w-3xl">
		<h1>{$page.data.metadata?.title}</h1>
		{#if $page.data.metadata?.thumbnail}
			<img
				src={$page.data.metadata.thumbnail.url}
				alt={$page.data.metadata.thumbnail.alt}
				class="w-full rounded-lg"
				width={800}
				height={400}
			/>
		{/if}
		<div class="mb-8 text-sm text-muted-foreground">
			Published on {new Date($page.data.metadata?.date).toLocaleDateString(currentLanguage)}
		</div>
		<div class="mdsvex">
			{@render children?.()}
		</div>
	</article>
</div>
