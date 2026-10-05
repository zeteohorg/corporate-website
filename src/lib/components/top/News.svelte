<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { isHighlightedPost } from '$lib/config/top';
	import { cn } from '$lib/utils';

	type PostSummary = { slug?: string; title: string; date: string };

	let { newsPosts = [], blogPosts = [] }: { newsPosts: PostSummary[]; blogPosts: PostSummary[] } =
		$props();

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.news);

	// e.g. 2026/6/9 — matches the wireframe
	const formatDate = (iso: string) => {
		const d = new Date(iso);
		return Number.isNaN(d.getTime())
			? iso
			: `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
	};

	// PC shows the latest 3 of each; phones show 2 news and 1 blog post (spec §15)
	const columns = $derived([
		{
			key: 'news',
			title: t.newsTitle,
			all: t.allNews,
			posts: newsPosts.slice(0, 3),
			phoneCount: 2
		},
		{
			key: 'blog',
			title: t.blogTitle,
			all: t.allPosts,
			posts: blogPosts.slice(0, 3),
			phoneCount: 1
		}
	]);
</script>

<!-- Text only, no thumbnails (the Shinkansen photo must not appear on the top page) -->
<section aria-label="{t.newsTitle} / {t.blogTitle}" class="bg-z-bg-sub text-z-text z-section">
	<div class="z-container grid gap-10 lg:grid-cols-2 lg:gap-12">
		{#each columns as column (column.key)}
			<div>
				<h2 class="text-[20px] font-bold lg:text-[24px]">{column.title}</h2>
				<ul class="mt-4 space-y-3 lg:mt-6">
					{#each column.posts as post, i (post.slug)}
						{@const highlighted =
							column.key === 'news' && !!post.slug && isHighlightedPost(post.slug)}
						<li class={cn(i >= column.phoneCount && 'hidden lg:block')}>
							<a
								href="/{lang}/{column.key}/{post.slug}/"
								class={cn(
									'bg-z-bg focus-visible:outline-z-accent block rounded-lg p-4 text-[14px] leading-[1.6] transition-colors focus-visible:outline-2 lg:text-[15px]',
									highlighted ? 'border-z-accent border-[1.5px]' : 'hover:bg-z-bg/70'
								)}
							>
								{#if highlighted}
									<span class="text-z-accent-text mr-2 font-bold">{t.newLabel}</span>
								{/if}
								<span>{post.title}</span>
								<time
									datetime={post.date}
									class="text-z-text-caption mt-1 block text-[13px] lg:ml-2 lg:inline"
								>
									{formatDate(post.date)}
								</time>
							</a>
						</li>
					{/each}
				</ul>
				<a
					href="/{lang}/{column.key}/"
					class="text-z-text focus-visible:outline-z-accent mt-3 inline-flex min-h-11 items-center text-[14px] font-bold hover:underline focus-visible:outline-2"
				>
					{column.all}
				</a>
			</div>
		{/each}
	</div>
</section>
