<script lang="ts">
	import type { SolutionFinderTranslation } from '$lib/i18n/types';
	import type { Lang, TechId, Verdict } from '$lib/data/solution-finder/types';
	import { fitLabel } from '$lib/data/solution-finder/types';
	import { TRAILS_PRICING } from '$lib/data/solution-finder/pricing';
	import { formatJpy } from './format';
	import DeployChips from './DeployChips.svelte';
	import { cn } from '$lib/utils';
	import { Ban } from 'lucide-svelte';

	interface Props {
		verdict: Verdict;
		t: SolutionFinderTranslation;
		lang: Lang;
	}
	let { verdict, t, lang }: Props = $props();

	const techName = (id: TechId) => t.tech[id]?.name ?? id;

	const badgeClass = (label: 'best' | 'conditional' | 'weak') =>
		label === 'best'
			? 'bg-primary text-primary-foreground'
			: label === 'conditional'
				? 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200'
				: 'bg-muted text-muted-foreground';
</script>

<div class="space-y-6">
	<!-- Primary recommendation — one clear top pick, visually dominant. -->
	<div class="border-primary bg-card rounded-xl border-2 p-6 shadow-sm">
		<div class="flex flex-wrap items-center gap-3">
			<span
				class="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase"
			>
				{t.verdict.recommended}
			</span>
			<span
				class={cn(
					'rounded-full px-2.5 py-0.5 text-xs font-semibold',
					badgeClass(fitLabel(verdict.primary.fit))
				)}
			>
				{t.fitLabels[fitLabel(verdict.primary.fit)]}
			</span>
			<h3 class="text-2xl font-bold">{techName(verdict.primary.tech)}</h3>
		</div>
		<p class="text-muted-foreground mt-3">{t.reasons[verdict.primary.reasonKey]}</p>

		<div class="mt-4">
			<DeployChips tech={verdict.primary.tech} {t} />
		</div>

		{#if verdict.championMode}
			<p class="mt-4 text-sm">
				<span class="text-muted-foreground">{t.pricing.heading}:</span>
				<span class="ml-1 font-bold">
					{formatJpy(TRAILS_PRICING.setup, lang)} + {formatJpy(TRAILS_PRICING.perDeviceMo, lang)}/{lang ===
					'ja'
						? '台/月'
						: 'device/mo'}
				</span>
			</p>
		{/if}
	</div>

	{#if verdict.isHybrid}
		<p class="text-muted-foreground text-sm">{t.verdict.hybridNote}</p>
	{/if}
	{#if verdict.floorNote}
		<p class="text-muted-foreground text-sm">{t.verdict.floorNote}</p>
	{/if}

	<!-- Alternatives — subordinated: smaller type, reduced visual weight. -->
	{#if verdict.alternatives.length}
		<div class="grid gap-3 sm:grid-cols-2">
			{#each verdict.alternatives as alt (alt.tech)}
				<div class="border-input bg-card/60 rounded-lg border p-4 opacity-80">
					<div class="flex items-center gap-2">
						<span class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
							{t.verdict.alternative}
						</span>
						<span class={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', badgeClass(fitLabel(alt.fit)))}>
							{t.fitLabels[fitLabel(alt.fit)]}
						</span>
					</div>
					<h4 class="mt-1 text-base font-semibold">{techName(alt.tech)}</h4>
					<p class="text-muted-foreground mt-1.5 text-sm">{t.reasons[alt.reasonKey]}</p>
					<div class="mt-3">
						<DeployChips tech={alt.tech} {t} />
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Honesty mechanic: explicitly excluded technologies, always visible pre-gate. -->
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
