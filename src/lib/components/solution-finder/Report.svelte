<script lang="ts">
	import type { SolutionFinderTranslation } from '$lib/i18n/types';
	import type {
		Answers,
		Lang,
		TcoResult,
		TechId,
		Verdict,
		WasteLoss
	} from '$lib/data/solution-finder/types';
	import type { Vendor } from '$lib/data/solution-finder/vendors';
	import { techById } from '$lib/data/solution-finder/tech';
	import { formatJpy, formatRange, interpolate } from './format';
	import { Button } from '$lib/components/ui/button';
	import { trackEvent } from '$lib/analytics';
	import { Printer, ExternalLink } from 'lucide-svelte';

	interface Props {
		verdict: Verdict;
		tco: Partial<Record<TechId, TcoResult>>;
		answers: Answers;
		vendors: Vendor[];
		wasteLoss: WasteLoss;
		t: SolutionFinderTranslation;
		lang: Lang;
	}
	let { verdict, tco, answers, vendors, wasteLoss, t, lang }: Props = $props();

	const techName = (id: TechId) => t.tech[id]?.name ?? id;
	const shownTechs = $derived([verdict.primary.tech, ...verdict.alternatives.map((a) => a.tech)]);
	const primaryTco = $derived(tco[verdict.primary.tech]);

	// Payback framing: months for the 3-yr TCO to be offset by annual waste-loss.
	const paybackMonths = $derived(
		primaryTco && wasteLoss.annualLoss > 0
			? Math.max(1, Math.round(primaryTco.total / (wasteLoss.annualLoss / 12)))
			: null
	);

	function print() {
		trackEvent('Report: PDF Opened', { tech: verdict.primary.tech });
		if (typeof window !== 'undefined') window.print();
	}

	// Human-readable inputs summary.
	const inputRows = $derived(
		[
			answers.facility && t.questions.facility.options[answers.facility],
			answers.targets.map((x) => t.questions.targets.options[x]).join(', '),
			answers.area && t.questions.area.options[answers.area],
			answers.accuracy && t.questions.accuracy.options[answers.accuracy],
			answers.constraints
				.filter((c) => c !== 'none')
				.map((c) => t.questions.constraints.options[c])
				.join(', '),
			answers.timeline && t.questions.timeline.options[answers.timeline],
			answers.budget && t.questions.budget.options[answers.budget]
		].filter(Boolean) as string[]
	);
</script>

<article class="sf-report space-y-10">
	<header class="flex flex-wrap items-start justify-between gap-4">
		<div>
			{#if verdict.championMode}
				<span
					class="bg-primary/10 text-primary mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
				>
					{t.report.champion.badge}
				</span>
			{/if}
			<h2 class="text-2xl font-bold sm:text-3xl">{t.report.title}</h2>
		</div>
		<Button variant="outline" onclick={print} class="print:hidden">
			<Printer class="mr-2 size-4" />
			{t.report.print}
		</Button>
	</header>

	<!-- 1. Inputs & assumptions -->
	<section>
		<h3 class="border-b pb-2 text-xl font-semibold">{t.report.inputsHeading}</h3>
		<ul class="text-muted-foreground mt-3 list-disc space-y-1 pl-5 text-sm">
			{#each inputRows as row, i (i)}
				<li>{row}</li>
			{/each}
		</ul>
	</section>

	<!-- 2. Recommendation & why -->
	<section>
		<h3 class="border-b pb-2 text-xl font-semibold">{t.report.recommendationHeading}</h3>
		<p class="mt-3 text-lg font-bold">{techName(verdict.primary.tech)}</p>
		<p class="text-muted-foreground mt-1">{t.reasons[verdict.primary.reasonKey]}</p>
		{#if verdict.excluded.length}
			<ul class="text-muted-foreground mt-3 space-y-1 text-sm">
				{#each verdict.excluded as ex (ex.tech)}
					<li>
						✗ <span class="font-medium">{techName(ex.tech)}</span> — {t.reasons[ex.reasonKey]}
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<!-- 3. 3-year TCO table -->
	<section>
		<h3 class="border-b pb-2 text-xl font-semibold">{t.report.tcoHeading}</h3>
		<p class="text-muted-foreground mt-2 text-xs">{t.cost.rangeNote}</p>
		<div class="mt-3 overflow-x-auto">
			<table class="w-full border-collapse text-sm">
				<thead>
					<tr class="border-b text-left">
						<th class="py-2 pr-4 font-semibold">—</th>
						{#each shownTechs as id (id)}
							<th class="px-3 py-2 font-semibold">{techName(id)}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<tr class="border-b">
						<td class="text-muted-foreground py-2 pr-4">{t.cost.capex}</td>
						{#each shownTechs as id (id)}
							<td class="px-3 py-2 tabular-nums">
								{tco[id]?.quoteBased && tco[id]?.total === 0
									? t.cost.quoteBased
									: formatJpy(tco[id]?.capex ?? 0, lang)}
							</td>
						{/each}
					</tr>
					<tr class="border-b">
						<td class="text-muted-foreground py-2 pr-4">{t.cost.opex}</td>
						{#each shownTechs as id (id)}
							<td class="px-3 py-2 tabular-nums">{formatJpy(tco[id]?.opex3yr ?? 0, lang)}</td>
						{/each}
					</tr>
					<tr class="font-semibold">
						<td class="py-2 pr-4">{t.cost.total}</td>
						{#each shownTechs as id (id)}
							<td class="px-3 py-2 tabular-nums">
								{tco[id]?.total
									? formatRange(tco[id]!.low, tco[id]!.high, lang)
									: t.cost.quoteBased}
							</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>
		<p class="text-muted-foreground mt-3 text-xs">{t.cost.disclaimer}</p>
	</section>

	<!-- 4. Vendor shortlist -->
	<section>
		<h3 class="border-b pb-2 text-xl font-semibold">{t.report.vendorsHeading}</h3>
		<ul class="mt-3 space-y-3">
			{#each vendors as v (v.id)}
				<li class="border-input rounded-lg border p-4">
					<div class="flex flex-wrap items-baseline justify-between gap-2">
						<a
							href={v.link}
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary inline-flex items-center gap-1 font-semibold hover:underline"
						>
							{v.name}<ExternalLink class="size-3" />
						</a>
						<span class="text-muted-foreground text-xs">{v.tech[lang]}</span>
					</div>
					<p class="text-muted-foreground mt-1 text-sm">
						<span class="font-medium">{t.report.vendorBestWhen}:</span>
						{v.bestWhen[lang]}
					</p>
				</li>
			{/each}
		</ul>
	</section>

	<!-- 5. Deployment timeline -->
	<section>
		<h3 class="border-b pb-2 text-xl font-semibold">{t.report.timelineHeading}</h3>
		<ul class="text-muted-foreground mt-3 space-y-1 text-sm">
			{#each shownTechs as id (id)}
				<li>
					<span class="text-foreground font-medium">{techName(id)}</span> —
					{techById(id)?.infraFree
						? lang === 'ja'
							? '数日〜1週間'
							: 'days – 1 week'
						: lang === 'ja'
							? '数週間〜数ヶ月（調査・配線・校正）'
							: 'weeks – months (survey, cabling, calibration)'}
				</li>
			{/each}
		</ul>
	</section>

	<!-- Champion mode: ringi-ready sections -->
	{#if verdict.championMode && primaryTco}
		<section class="border-primary/30 bg-primary/5 space-y-6 rounded-xl border p-6">
			<div>
				<h3 class="text-lg font-bold">{t.report.champion.summaryHeading}</h3>
				<p class="text-muted-foreground mt-2 text-sm">
					{interpolate(t.waste.headline, { amount: formatJpy(wasteLoss.annualLoss, lang) })}
				</p>
			</div>
			<div>
				<h4 class="font-semibold">{t.report.champion.costHeading}</h4>
				<p class="text-muted-foreground mt-1 text-sm">
					{t.cost.capex}: {formatJpy(primaryTco.capex, lang)} ·
					{t.cost.total}: {formatRange(primaryTco.low, primaryTco.high, lang)}
					{#if paybackMonths}
						· {lang === 'ja'
							? `回収目安 約${paybackMonths}ヶ月`
							: `~${paybackMonths}-month payback`}
					{/if}
				</p>
			</div>
			<div>
				<h4 class="font-semibold">{t.report.champion.proposalHeading}</h4>
				<p class="text-muted-foreground mt-1 text-sm">
					{lang === 'ja'
						? '2週間のPoC（小規模・固定費用・3つの成功指標）の承認をご提案します。'
						: 'Approve a 2-week PoC — small scope, fixed price, three success criteria.'}
				</p>
			</div>
		</section>
	{/if}

	<!-- 7. Next steps -->
	<section class="print:hidden">
		<h3 class="border-b pb-2 text-xl font-semibold">{t.report.nextStepsHeading}</h3>
		<Button
			href="https://meetings-eu1.hubspot.com/satomi-le-guilly?utm_source=solution_finder&utm_medium=report"
			class="mt-3"
		>
			{t.report.pocCta}
		</Button>
	</section>
</article>

<style>
	@media print {
		.sf-report {
			font-size: 11pt;
		}
	}
</style>
