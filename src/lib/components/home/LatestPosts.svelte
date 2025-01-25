<!-- src/lib/components/home/LatestPosts.svelte -->
<script lang="ts">
	import type { Post } from '$lib/types';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	let { posts, type }: { posts: Post[]; type: 'blog' | 'news' } = $props();

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage][type]);

	// Take only the 3 most recent posts
	const latestPosts = $derived(posts.slice(0, 3));
</script>

<section class="py-16">
	<div class="container px-4">
		<div class="mb-12 flex items-center justify-between">
			<h2 class="text-3xl font-bold">{t.title}</h2>
			<a href="/{currentLanguage}/{type}" class={buttonVariants({ variant: 'ghost' })}>
				{t.readMore} →
			</a>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each latestPosts as post}
				<Card.Root class="flex h-full flex-col">
					<Card.Header>
						<Card.Title>
							<a
								href="/{currentLanguage}/{type}/{post.slug}"
								class="transition-colors hover:text-primary"
							>
								{post.title}
							</a>
						</Card.Title>
						<Card.Description>
							{post.description}
						</Card.Description>
					</Card.Header>
					<Card.Footer class="mt-auto">
						<time class="text-sm text-muted-foreground">
							{new Date(post.date).toLocaleDateString(currentLanguage)}
						</time>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>
