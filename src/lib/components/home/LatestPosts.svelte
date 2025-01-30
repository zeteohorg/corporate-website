<script lang="ts">
	import type { Post } from '$lib/types';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let { posts = [], type }: { posts: Post[]; type: 'blog' | 'news' } = $props();

	$effect(() => {
		console.log(`[LatestPosts] Rendering ${type} posts:`, posts);
	});

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage][type]);
	const latestPosts = $derived(posts?.slice(0, 3) || []);
</script>

{#if latestPosts.length > 0}
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
					<a
						href="/{currentLanguage}/{type}/{post.slug}"
						class="block overflow-hidden rounded-lg bg-card shadow-sm transition-all hover:shadow-md"
					>
						{#if post.thumbnail}
							<div class="relative aspect-video overflow-hidden">
								<img
									src={post.thumbnail.url}
									alt={post.thumbnail.alt}
									class="object-cover transition-all hover:scale-105"
									loading="lazy"
									decoding="async"
									width={800}
									height={400}
								/>
							</div>
						{/if}

						<div class="p-6">
							<h3 class="mb-2 text-2xl font-semibold">
								{post.title}
							</h3>
							<p class="mb-4 text-muted-foreground">
								{post.description}
							</p>
							<time class="text-sm text-muted-foreground">
								{new Date(post.date).toLocaleDateString(currentLanguage)}
							</time>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}
