<script lang="ts">
	import { TECHS } from '$lib/data/solution-finder/tech';
	import { citationById } from '$lib/data/solution-finder/citations';
	import FinderCta from '$lib/components/solution-finder/FinderCta.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { SITE_ORIGIN } from '$lib/origin';

	let { data } = $props();
	const lang = $derived(data.lang);
	const t = $derived(data.translations.positioning);
	const tp = $derived(t.pillar);
	const deploy = $derived(data.translations.solutionFinder.deploy);
	const tech = $derived(data.translations.solutionFinder.tech);

	const canonical = $derived(`${SITE_ORIGIN}/${lang}/indoor-positioning-comparison/`);

	// Citation numbering: first-seen order walking the matrix top to bottom —
	// the footnote list below only shows sources actually cited by a row.
	const citationIndex = $derived.by(() => {
		const map = new Map<string, number>();
		for (const m of TECHS) for (const id of m.sources) if (!map.has(id)) map.set(id, map.size + 1);
		return map;
	});
	const footnotes = $derived(
		[...citationIndex.entries()]
			.sort((a, b) => a[1] - b[1])
			.map(([id, n]) => ({ n, c: citationById(id) }))
			.filter((f): f is { n: number; c: NonNullable<ReturnType<typeof citationById>> } => Boolean(f.c))
	);
	const sup = (ids: string[]) => ids.map((id) => citationIndex.get(id)).filter(Boolean).join(',');

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

	<!-- Truth table as real, extractable HTML (not an image). Deployment
	     attributes replace CAPEX — structural facts, never ¥ figures. -->
	<div class="mt-8 overflow-x-auto">
		<table class="w-full border-collapse text-sm">
			<caption class="sr-only">{tp.tableCaption}</caption>
			<thead>
				<tr class="border-b text-left align-bottom">
					<th class="py-2 pr-3 font-semibold">{tp.headers.tech}</th>
					<th class="px-3 py-2 font-semibold">{tp.headers.accuracy}</th>
					<th class="px-3 py-2 font-semibold">{tp.headers.install}</th>
					<th class="px-3 py-2 font-semibold">{tp.headers.deployTime}</th>
					<th class="px-3 py-2 font-semibold">{tp.headers.maintenance}</th>
					<th class="px-3 py-2 font-semibold">{tp.headers.reject}</th>
				</tr>
			</thead>
			<tbody>
				{#each TECHS as m (m.id)}
					<tr class="border-b align-top">
						<th scope="row" class="py-2 pr-3 text-left font-semibold whitespace-nowrap">
							{tech[m.id].name}<sup>{sup(m.sources)}</sup>
						</th>
						<td class="px-3 py-2">{tech[m.id].accuracy}</td>
						<td class="px-3 py-2">{deploy.values.infra[m.infra]}</td>
						<td class="px-3 py-2">{deploy.values.deployTime[m.deployTime]}</td>
						<td class="px-3 py-2">{deploy.values.maintenance[m.maintenance]}</td>
						<td class="text-muted-foreground px-3 py-2">{tech[m.id].killCriteria}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="text-muted-foreground mt-3 text-xs">{tp.capexNote}</p>

	<!-- Footnotes: every attribute claim cites its evidence (spec §8). -->
	<ol class="text-muted-foreground mt-3 space-y-1 text-xs">
		{#each footnotes as f (f.n)}
			<li>
				[{f.n}] {f.c.authors} ({f.c.year}). {f.c.title}. <em>{f.c.venue}</em>.
				<a href={f.c.url} target="_blank" rel="noopener noreferrer" class="text-primary underline"
					>{f.c.url}</a
				>
			</li>
		{/each}
	</ol>

	<FinderCta
		{lang}
		heading={t.ctaHeading}
		text={t.ctaText}
		button={t.ctaButton}
		location="pillar"
	/>

	<!-- PDR vs neural-inertial: the honest positioning of TRAILS' technology class. -->
	<section class="mt-8">
		<h2 class="text-2xl font-bold">{tp.pdrVsNeural.heading}</h2>
		<p class="text-muted-foreground mt-3">{tp.pdrVsNeural.body}</p>
	</section>

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
