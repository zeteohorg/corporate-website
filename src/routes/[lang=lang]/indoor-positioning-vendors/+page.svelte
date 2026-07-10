<script lang="ts">
	import { VENDORS } from '$lib/data/solution-finder/vendors';
	import FinderCta from '$lib/components/solution-finder/FinderCta.svelte';
	import { SITE_ORIGIN } from '$lib/origin';
	import { ExternalLink } from 'lucide-svelte';
	import { cn } from '$lib/utils';

	let { data } = $props();
	const lang = $derived(data.lang);
	const t = $derived(data.translations.positioning);
	const td = $derived(t.directory);
	const canonical = $derived(`${SITE_ORIGIN}/${lang}/indoor-positioning-vendors/`);
</script>

<svelte:head>
	<title>{td.metaTitle}</title>
	<meta name="description" content={td.metaDescription} />
	<link rel="canonical" href={canonical} />
</svelte:head>

<main class="container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
	<h1 class="text-3xl font-bold sm:text-4xl">{td.h1}</h1>
	<p class="text-muted-foreground mt-2 text-sm">{t.updatedLabel}</p>
	<p class="mt-5 text-lg text-pretty">{td.intro}</p>

	<ul class="mt-8 space-y-3">
		{#each VENDORS as v (v.id)}
			<li
				class={cn(
					'rounded-lg border p-5',
					v.isSelf ? 'border-primary bg-primary/5' : 'border-input'
				)}
			>
				<div class="flex flex-wrap items-baseline justify-between gap-2">
					<a
						href={v.link}
						target="_blank"
						rel="noopener noreferrer"
						class="text-primary inline-flex items-center gap-1 text-lg font-semibold hover:underline"
					>
						{v.name}<ExternalLink class="size-3.5" />
					</a>
					<span class="text-muted-foreground text-sm">{v.tech[lang]}</span>
				</div>
				<p class="mt-1 text-sm">{v.niche[lang]}</p>
				<p class="text-muted-foreground mt-2 text-sm">
					<span class="text-foreground font-medium">{td.headers.bestWhen}:</span>
					{v.bestWhen[lang]}
				</p>
			</li>
		{/each}
	</ul>

	<p class="mt-6">
		<a
			href={`/${lang}/indoor-positioning-comparison/`}
			class="text-primary font-medium hover:underline"
		>
			{t.crossToComparison}
		</a>
	</p>

	<FinderCta
		{lang}
		heading={t.ctaHeading}
		text={t.ctaText}
		button={t.ctaButton}
		location="directory"
	/>
</main>
