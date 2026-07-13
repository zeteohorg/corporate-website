<script lang="ts">
	// Gated deliverable (spec §7): nine neutral, print/PDF-optimized slides the
	// visitor can circulate internally as-is. Per-section copy buttons + a
	// window.print() download; a discreet attribution line on every slide.

	import type { SolutionFinderTranslation } from '$lib/i18n/types';
	import type { Answers, Facility, Lang, TechId, Verdict } from '$lib/data/solution-finder/types';
	import { fitLabel } from '$lib/data/solution-finder/types';
	import { TECHS, techById } from '$lib/data/solution-finder/tech';
	import { CITATIONS, citationById } from '$lib/data/solution-finder/citations';
	import { TRAILS_PRICING } from '$lib/data/solution-finder/pricing';
	import { selectUseCases } from '$lib/data/solution-finder/use-cases';
	import { formatJpy, interpolate } from './format';
	import { Button } from '$lib/components/ui/button';
	import { trackEvent } from '$lib/analytics';
	import { Printer, Copy } from 'lucide-svelte';

	interface Props {
		verdict: Verdict;
		answers: Answers;
		t: SolutionFinderTranslation;
		lang: Lang;
	}
	let { verdict, answers, t, lang }: Props = $props();

	const techName = (id: TechId) => t.tech[id]?.name ?? id;

	// Maps each tech to the closest provider-evaluation checklist family (§6).
	const CHECKLIST_FAMILY: Record<TechId, string> = {
		trails: 'smartphone',
		wifi: 'smartphone',
		geomag_phone: 'smartphone',
		geomag_infra: 'smartphone',
		pdr: 'smartphone',
		ble_rssi: 'ble',
		acoustic: 'ble',
		ble_aoa: 'aoa',
		uwb: 'uwb',
		camera: 'camera',
		qr_nfc: 'qr',
		visual_slam: 'slam',
		gnss: 'smartphone'
	};

	// Citation numbering: first-seen order walking the full matrix (§8 appendix).
	const citationIndex = $derived.by(() => {
		const map = new Map<string, number>();
		for (const tech of TECHS) for (const id of tech.sources) if (!map.has(id)) map.set(id, map.size + 1);
		return map;
	});
	const usedCitations = $derived(
		[...citationIndex.entries()]
			.sort((a, b) => a[1] - b[1])
			.map(([id]) => citationById(id))
			.filter((c): c is NonNullable<typeof c> => Boolean(c))
	);
	const sup = (ids: string[]) => ids.map((id) => citationIndex.get(id)).filter(Boolean).join(',');

	type MatrixStatus = 'primary' | 'alternative' | 'excluded' | 'neutral';
	interface MatrixRow {
		id: TechId;
		status: MatrixStatus;
		reasonKey?: string;
		fit?: number;
	}
	const matrix = $derived.by((): MatrixRow[] => {
		const altIds = new Set(verdict.alternatives.map((a) => a.tech));
		const exMap = new Map(verdict.excluded.map((e) => [e.tech, e.reasonKey]));
		return TECHS.map((tech): MatrixRow => {
			if (tech.id === verdict.primary.tech) {
				return { id: tech.id, status: 'primary', reasonKey: verdict.primary.reasonKey, fit: verdict.primary.fit };
			}
			const alt = verdict.alternatives.find((a) => a.tech === tech.id);
			if (alt) return { id: tech.id, status: 'alternative', reasonKey: alt.reasonKey, fit: alt.fit };
			if (exMap.has(tech.id)) return { id: tech.id, status: 'excluded', reasonKey: exMap.get(tech.id) };
			return { id: tech.id, status: 'neutral' };
		});
	});

	const timelineGroups = $derived(
		(['days', 'weeks', 'months'] as const).map((bucket) => ({
			bucket,
			label: t.slides.deployTimeGroups[bucket],
			techs: TECHS.filter((tech) => tech.deployTime === bucket)
		}))
	);

	const requirementRows = $derived(
		[
			answers.facility && t.questions.facility.options[answers.facility],
			answers.targets.length ? answers.targets.map((x) => t.questions.targets.options[x]).join(', ') : undefined,
			answers.area && t.questions.area.options[answers.area],
			answers.people && t.questions.people.options[answers.people],
			answers.vehicles && t.questions.vehicles.options[answers.vehicles],
			answers.accuracy && t.questions.accuracy.options[answers.accuracy],
			answers.constraints.filter((c) => c !== 'none').length
				? answers.constraints
						.filter((c) => c !== 'none')
						.map((c) => t.questions.constraints.options[c])
						.join(', ')
				: undefined,
			answers.device && t.questions.device.options[answers.device],
			answers.timeline && t.questions.timeline.options[answers.timeline]
		].filter(Boolean) as string[]
	);

	const meta = $derived(techById(verdict.primary.tech));
	const checklistFamily = $derived(CHECKLIST_FAMILY[verdict.primary.tech] ?? 'smartphone');
	const checklistQuestions = $derived(t.checklist[checklistFamily] ?? t.checklist.smartphone);

	const titleSlot = $derived(
		interpolate(t.slides.title, { company: lang === 'ja' ? '貴社' : 'Your Company' })
	);

	// Facility-specific use cases (slide 2): the concrete-value story that
	// replaced the waste-loss estimate. Selection logic lives in the data layer.
	const useCases = $derived(
		selectUseCases(answers, t.slides.useCases as Record<Facility, { title: string; desc: string }[]>)
	);
	const useCasesHeading = $derived(
		interpolate(t.slides.useCasesHeading, {
			facility: t.questions.facility.options[answers.facility ?? 'other']
		})
	);

	let sectionEls: Record<number, HTMLElement> = $state({});

	function copySection(i: number) {
		const el = sectionEls[i];
		if (!el || typeof navigator === 'undefined' || !navigator.clipboard) return;
		navigator.clipboard.writeText(el.innerText).catch(() => {});
		trackEvent('Slides: Section Copied', { section: String(i) });
	}

	function print() {
		trackEvent('Slides: Download', { tech: verdict.primary.tech });
		if (typeof window !== 'undefined') window.print();
	}
</script>

<div class="sf-slidepack space-y-6">
	<div class="flex justify-end print:hidden">
		<Button variant="outline" onclick={print}>
			<Printer class="mr-2 size-4" />
			{t.slides.download}
		</Button>
	</div>

	<!-- 1. Executive summary -->
	<section
		class="slide aspect-[297/210] w-full space-y-3 rounded-lg border bg-card p-8 print:break-after-page"
		bind:this={sectionEls[0]}
	>
		<div class="flex items-start justify-between">
			<h2 class="text-xl font-bold">{titleSlot}</h2>
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground print:hidden"
				onclick={() => copySection(0)}
				aria-label={t.slides.copySection}
			>
				<Copy class="size-4" />
			</button>
		</div>
		<h3 class="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
			{t.slides.execSummary}
		</h3>
		<p class="text-base">
			<span class="font-bold">{techName(verdict.primary.tech)}</span> — {t.reasons[verdict.primary.reasonKey]}
		</p>
		{#if verdict.championMode}
			<p class="text-sm">
				{t.pricing.heading}: {formatJpy(TRAILS_PRICING.setup, lang)} + {formatJpy(TRAILS_PRICING.perDeviceMo, lang)}/{lang === 'ja' ? '台/月' : 'device/mo'}
			</p>
			<p class="text-muted-foreground text-xs">{t.pricing.handsetNote}</p>
		{/if}
		<p class="text-muted-foreground mt-auto pt-6 text-xs">{t.slides.attribution}</p>
	</section>

	<!-- 2. Facility-specific use cases -->
	<section
		class="slide aspect-[297/210] w-full space-y-3 rounded-lg border bg-card p-8 print:break-after-page"
		bind:this={sectionEls[1]}
	>
		<div class="flex items-start justify-between">
			<h3 class="text-lg font-bold">{useCasesHeading}</h3>
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground print:hidden"
				onclick={() => copySection(1)}
				aria-label={t.slides.copySection}
			>
				<Copy class="size-4" />
			</button>
		</div>
		<ul class="space-y-3 text-sm">
			{#each useCases as uc (uc.title)}
				<li>
					<div class="font-semibold">{uc.title}</div>
					<div class="text-muted-foreground">{uc.desc}</div>
				</li>
			{/each}
		</ul>
		<p class="text-muted-foreground mt-auto pt-6 text-xs">{t.slides.attribution}</p>
	</section>

	<!-- 3. Requirements -->
	<section
		class="slide aspect-[297/210] w-full space-y-3 rounded-lg border bg-card p-8 print:break-after-page"
		bind:this={sectionEls[2]}
	>
		<div class="flex items-start justify-between">
			<h3 class="text-lg font-bold">{t.slides.requirements}</h3>
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground print:hidden"
				onclick={() => copySection(2)}
				aria-label={t.slides.copySection}
			>
				<Copy class="size-4" />
			</button>
		</div>
		<ul class="list-disc space-y-1 pl-5 text-sm">
			{#each requirementRows as row, i (i)}
				<li>{row}</li>
			{/each}
		</ul>
		<p class="text-muted-foreground mt-auto pt-6 text-xs">{t.slides.attribution}</p>
	</section>

	<!-- 4. Alternatives considered (full matrix, honest exclusions + citations) -->
	<section
		class="slide w-full space-y-3 rounded-lg border bg-card p-8 print:break-after-page"
		bind:this={sectionEls[3]}
	>
		<div class="flex items-start justify-between">
			<h3 class="text-lg font-bold">{t.slides.alternatives}</h3>
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground print:hidden"
				onclick={() => copySection(3)}
				aria-label={t.slides.copySection}
			>
				<Copy class="size-4" />
			</button>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full border-collapse text-xs">
				<thead>
					<tr class="border-b text-left">
						<th class="py-1.5 pr-2 font-semibold">—</th>
						<th class="px-2 py-1.5 font-semibold">{t.verdict.fitLabel}</th>
						<th class="px-2 py-1.5 font-semibold">—</th>
					</tr>
				</thead>
				<tbody>
					{#each matrix as row (row.id)}
						<tr class="border-b align-top">
							<th scope="row" class="py-1.5 pr-2 text-left font-medium whitespace-nowrap">
								{techName(row.id)}<sup>{sup(techById(row.id)?.sources ?? [])}</sup>
							</th>
							<td class="px-2 py-1.5 whitespace-nowrap">
								{#if row.fit !== undefined}
									{t.fitLabels[fitLabel(row.fit)]}
								{:else}
									{t.slides.notApplicable}
								{/if}
							</td>
							<td class="text-muted-foreground px-2 py-1.5">
								{row.reasonKey ? t.reasons[row.reasonKey] : t.slides.notApplicable}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="text-muted-foreground mt-auto pt-6 text-xs">{t.slides.attribution}</p>
	</section>

	<!-- 5. Deployment timeline -->
	<section
		class="slide aspect-[297/210] w-full space-y-3 rounded-lg border bg-card p-8 print:break-after-page"
		bind:this={sectionEls[4]}
	>
		<div class="flex items-start justify-between">
			<h3 class="text-lg font-bold">{t.slides.timelineComparison}</h3>
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground print:hidden"
				onclick={() => copySection(4)}
				aria-label={t.slides.copySection}
			>
				<Copy class="size-4" />
			</button>
		</div>
		<div class="space-y-3 text-sm">
			{#each timelineGroups as group (group.bucket)}
				<div>
					<div class="font-semibold">{group.label}</div>
					<div class="text-muted-foreground">{group.techs.map((tt) => techName(tt.id)).join('、')}</div>
				</div>
			{/each}
		</div>
		<p class="text-muted-foreground mt-auto pt-6 text-xs">{t.slides.attribution}</p>
	</section>

	<!-- 6. Risks & mitigations -->
	<section
		class="slide aspect-[297/210] w-full space-y-3 rounded-lg border bg-card p-8 print:break-after-page"
		bind:this={sectionEls[5]}
	>
		<div class="flex items-start justify-between">
			<h3 class="text-lg font-bold">{t.slides.risks}</h3>
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground print:hidden"
				onclick={() => copySection(5)}
				aria-label={t.slides.copySection}
			>
				<Copy class="size-4" />
			</button>
		</div>
		<ul class="list-disc space-y-2 pl-5 text-sm">
			{#each t.slides.risksBody as risk, i (i)}
				<li>{risk}</li>
			{/each}
		</ul>
		<p class="text-muted-foreground mt-auto pt-6 text-xs">{t.slides.attribution}</p>
	</section>

	<!-- 7. Provider-evaluation checklist -->
	<section
		class="slide aspect-[297/210] w-full space-y-3 rounded-lg border bg-card p-8 print:break-after-page"
		bind:this={sectionEls[6]}
	>
		<div class="flex items-start justify-between">
			<h3 class="text-lg font-bold">{t.slides.checklist}</h3>
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground print:hidden"
				onclick={() => copySection(6)}
				aria-label={t.slides.copySection}
			>
				<Copy class="size-4" />
			</button>
		</div>
		<ol class="list-decimal space-y-2 pl-5 text-sm">
			{#each checklistQuestions as q, i (i)}
				<li>{q}</li>
			{/each}
		</ol>
		<p class="text-muted-foreground mt-auto pt-6 text-xs">{t.slides.attribution}</p>
	</section>

	<!-- 8. Proposal (championMode) / re-diagnosis invitation -->
	<section
		class="slide aspect-[297/210] w-full space-y-3 rounded-lg border bg-card p-8 print:break-after-page"
		bind:this={sectionEls[7]}
	>
		<div class="flex items-start justify-between">
			<h3 class="text-lg font-bold">{t.slides.proposal}</h3>
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground print:hidden"
				onclick={() => copySection(7)}
				aria-label={t.slides.copySection}
			>
				<Copy class="size-4" />
			</button>
		</div>
		<p class="text-sm">
			{verdict.championMode ? t.slides.proposalBody : t.slides.reDiagnoseInvite}
		</p>
		<p class="text-muted-foreground mt-auto pt-6 text-xs">{t.slides.attribution}</p>
	</section>

	<!-- 9. Methodology & sources appendix -->
	<section
		class="slide w-full space-y-3 rounded-lg border bg-card p-8 print:break-after-page"
		bind:this={sectionEls[8]}
	>
		<div class="flex items-start justify-between">
			<h3 class="text-lg font-bold">{t.slides.sources}</h3>
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground print:hidden"
				onclick={() => copySection(8)}
				aria-label={t.slides.copySection}
			>
				<Copy class="size-4" />
			</button>
		</div>
		<ol class="space-y-1.5 text-xs">
			{#each usedCitations as c, i (c.id)}
				<li>
					[{i + 1}] {c.authors} ({c.year}). {c.title}. <em>{c.venue}</em>.
					<a href={c.url} target="_blank" rel="noopener noreferrer" class="text-primary underline">{c.url}</a>
					— {c.note}
				</li>
			{/each}
		</ol>
		<p class="text-muted-foreground mt-auto pt-6 text-xs">{t.slides.attribution}</p>
	</section>
</div>

<style>
	@media print {
		.sf-slidepack :global(.slide) {
			break-after: page;
		}
	}
</style>
