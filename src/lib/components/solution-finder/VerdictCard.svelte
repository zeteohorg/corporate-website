<script lang="ts">
	import type { SolutionFinderTranslation } from '$lib/i18n/types';
	import type { Lang, TcoResult, TechId, Verdict } from '$lib/data/solution-finder/types';
	import { formatRange } from './format';
	import FitBars from './FitBars.svelte';
	import { cn } from '$lib/utils';
	import { Ban } from 'lucide-svelte';

	interface Props {
		verdict: Verdict;
		tco: Partial<Record<TechId, TcoResult>>;
		t: SolutionFinderTranslation;
		lang: Lang;
	}
	let { verdict, tco, t, lang }: Props = $props();

	const techName = (id: TechId) => t.tech[id]?.name ?? id;

	function tcoText(id: TechId): string | null {
		const r = tco[id];
		if (!r) return null;
		if (r.quoteBased && r.total === 0) return t.cost.quoteBased;
		return formatRange(r.low, r.high, lang);
	}

	const bars = $derived([
		{ name: techName(verdict.primary.tech), fit: verdict.primary.fit, primary: true },
		...verdict.alternatives.map((a) => ({ name: techName(a.tech), fit: a.fit }))
	]);
</script>

<div class="space-y-6">
	<!-- Primary recommendation -->
	<div class="border-primary bg-card rounded-xl border-2 p-6 shadow-sm">
		<div class="flex flex-wrap items-center gap-3">
			<span
				class="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase"
			>
				{t.verdict.recommended}
			</span>
			<h3 class="text-2xl font-bold">{techName(verdict.primary.tech)}</h3>
		</div>
		<p class="text-muted-foreground mt-3">{t.reasons[verdict.primary.reasonKey]}</p>
		{#if tcoText(verdict.primary.tech)}
			<p class="mt-4 text-sm">
				<span class="text-muted-foreground">{t.verdict.tco3yr}:</span>
				<span class="ml-1 text-lg font-bold">{tcoText(verdict.primary.tech)}</span>
			</p>
		{/if}
	</div>

	{#if verdict.isHybrid}
		<p class="text-muted-foreground text-sm">{t.verdict.hybridNote}</p>
	{/if}
	{#if verdict.floorNote}
		<p class="text-muted-foreground text-sm">{t.verdict.floorNote}</p>
	{/if}

	<!-- Alternatives -->
	{#if verdict.alternatives.length}
		<div class="grid gap-4 sm:grid-cols-2">
			{#each verdict.alternatives as alt (alt.tech)}
				<div class="border-input bg-card rounded-lg border p-5">
					<div class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
						{t.verdict.alternative}
					</div>
					<h4 class="mt-1 text-lg font-semibold">{techName(alt.tech)}</h4>
					<p class="text-muted-foreground mt-2 text-sm">{t.reasons[alt.reasonKey]}</p>
					{#if tcoText(alt.tech)}
						<p class="mt-3 text-sm font-medium">{tcoText(alt.tech)}</p>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<!-- Fit bars -->
	<div class="border-input bg-card rounded-lg border p-5">
		<div class="text-muted-foreground mb-3 text-xs font-semibold tracking-wide uppercase">
			{t.verdict.fitLabel}
		</div>
		<FitBars {bars} fitLabel={t.verdict.fitLabel} />
	</div>

	<!-- Honesty mechanic: explicitly excluded technologies -->
	{#if verdict.excluded.length}
		<div class={cn('border-input text-muted-foreground rounded-lg border border-dashed p-5')}>
			<div class="text-foreground mb-2 flex items-center gap-2 text-sm font-semibold">
				<Ban class="size-4" />
				{t.verdict.notRecommendedTitle}
			</div>
			<ul class="space-y-1 text-sm">
				{#each verdict.excluded as ex (ex.tech)}
					<li><span class="font-medium">{techName(ex.tech)}</span> — {t.reasons[ex.reasonKey]}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
