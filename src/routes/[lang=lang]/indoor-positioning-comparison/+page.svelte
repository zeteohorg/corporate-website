<script lang="ts">
	import { TECHS } from '$lib/data/solution-finder/tech';
	import { formatJpy } from '$lib/components/solution-finder/format';
	import FinderCta from '$lib/components/solution-finder/FinderCta.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { SITE_ORIGIN } from '$lib/origin';

	let { data } = $props();
	const lang = $derived(data.lang);
	const t = $derived(data.translations.positioning);
	const tp = $derived(t.pillar);
	const tech = $derived(data.translations.solutionFinder.tech);

	const canonical = $derived(`${SITE_ORIGIN}/${lang}/indoor-positioning-comparison/`);

	// FAQPage structured data — extractable by Google + AI assistants (GEO).
	const faqSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: tp.faq.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	});
</script>

<svelte:head>
	<title>{tp.metaTitle}</title>
	<meta name="description" content={tp.metaDescription} />
	<link rel="canonical" href={canonical} />
</svelte:head>

<JsonLd schema={faqSchema} />

<main class="container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
	<h1 class="text-3xl font-bold sm:text-4xl">{tp.h1}</h1>
	<p class="text-muted-foreground mt-2 text-sm">{t.updatedLabel}</p>
	<p class="mt-5 text-lg text-pretty">{tp.intro}</p>

	<!-- Truth table as real, extractable HTML (not an image). -->
	<div class="mt-8 overflow-x-auto">
		<table class="w-full border-collapse text-sm">
			<caption class="sr-only">{tp.tableCaption}</caption>
			<thead>
				<tr class="border-b text-left align-bottom">
					<th class="py-2 pr-3 font-semibold">{tp.headers.tech}</th>
					<th class="px-3 py-2 font-semibold">{tp.headers.accuracy}</th>
					<th class="px-3 py-2 font-semibold">{tp.headers.infra}</th>
					<th class="px-3 py-2 font-semibold">{tp.headers.capex}</th>
					<th class="px-3 py-2 font-semibold">{tp.headers.opex}</th>
					<th class="px-3 py-2 font-semibold">{tp.headers.reject}</th>
				</tr>
			</thead>
			<tbody>
				{#each TECHS as m (m.id)}
					<tr class="border-b align-top">
						<th scope="row" class="py-2 pr-3 text-left font-semibold whitespace-nowrap">
							{tech[m.id].name}
						</th>
						<td class="px-3 py-2">{tech[m.id].accuracy}</td>
						<td class="px-3 py-2">{tech[m.id].infra}</td>
						<td class="px-3 py-2 tabular-nums">
							{m.capexAnchor ? formatJpy(m.capexAnchor, lang) : '—'}
						</td>
						<td class="px-3 py-2">{tech[m.id].opex}</td>
						<td class="text-muted-foreground px-3 py-2">{tech[m.id].killCriteria}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="text-muted-foreground mt-3 text-xs">{tp.capexNote}</p>

	<p class="mt-5">
		<a
			href={`/${lang}/indoor-positioning-vendors/`}
			class="text-primary font-medium hover:underline"
		>
			{t.crossToVendors}
		</a>
	</p>

	<FinderCta
		{lang}
		heading={t.ctaHeading}
		text={t.ctaText}
		button={t.ctaButton}
		location="pillar"
	/>

	<!-- FAQ: question-phrased headings + visible answers (matches the JSON-LD). -->
	<section class="mt-8">
		<h2 class="text-2xl font-bold">{tp.faqHeading}</h2>
		<div class="mt-5 space-y-6">
			{#each tp.faq as f, i (i)}
				<div>
					<h3 class="text-lg font-semibold">{f.q}</h3>
					<p class="text-muted-foreground mt-1">{f.a}</p>
				</div>
			{/each}
		</div>
	</section>
</main>
