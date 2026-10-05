<script lang="ts">
	import type { SolutionFinderTranslation } from '$lib/i18n/types';
	import type { TechId, Verdict } from '$lib/data/solution-finder/types';
	import { Button } from '$lib/components/ui/button';
	import { AlertTriangle } from 'lucide-svelte';

	interface Props {
		verdict: Verdict;
		t: SolutionFinderTranslation;
	}
	let { verdict, t }: Props = $props();

	const techName = (id: TechId) => t.tech[id]?.name ?? id;
	const conflictKeys = $derived(verdict.noFit?.conflictKeys ?? []);
</script>

{#if verdict.noFit}
	<div class="border-destructive/30 bg-destructive/5 rounded-xl border p-6">
		<div class="text-destructive flex items-center gap-2">
			<AlertTriangle class="size-5" />
			<h3 class="text-lg font-bold">{t.noFit.title}</h3>
		</div>
		<p class="text-muted-foreground mt-2 text-sm">{t.noFit.intro}</p>

		<ul class="mt-3 space-y-1 text-sm">
			{#each conflictKeys as key (key)}
				<li class="flex gap-2">
					<span aria-hidden="true">✗</span>
					<span>{t.noFit.conflicts[key]}</span>
				</li>
			{/each}
		</ul>

		<p class="text-muted-foreground mt-4 text-sm">{t.noFit.relaxHint}</p>

		<Button
			href="https://meetings-eu1.hubspot.com/satomi-le-guilly?utm_source=solution_finder&utm_medium=nofit"
			class="mt-4"
		>
			{t.verdict.hotCta}
		</Button>

		<div class="border-input mt-5 rounded-lg border border-dashed p-4">
			<div class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
				{t.noFit.referenceLabel}
			</div>
			<p class="mt-1 font-medium">{techName(verdict.primary.tech)}</p>
			<p class="text-muted-foreground mt-1 text-sm">{t.reasons[verdict.primary.reasonKey]}</p>
		</div>
	</div>
{/if}
