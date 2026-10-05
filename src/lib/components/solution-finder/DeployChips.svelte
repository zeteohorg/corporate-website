<script lang="ts">
	import type { SolutionFinderTranslation } from '$lib/i18n/types';
	import type { TechId } from '$lib/data/solution-finder/types';
	import { techById } from '$lib/data/solution-finder/tech';

	interface Props {
		tech: TechId;
		t: SolutionFinderTranslation;
	}
	let { tech, t }: Props = $props();

	const meta = $derived(techById(tech));

	const chips = $derived(
		meta
			? [
					{ label: t.deploy.infra, value: t.deploy.values.infra[meta.infra] },
					{ label: t.deploy.deployTime, value: t.deploy.values.deployTime[meta.deployTime] },
					{ label: t.deploy.maintenance, value: t.deploy.values.maintenance[meta.maintenance] },
					{ label: t.deploy.carrier, value: t.deploy.values.carrier[meta.carrier] },
					{ label: t.deploy.infraCost, value: t.costTiers[meta.infraCost] },
					{ label: t.deploy.hardwareCost, value: t.costTiers[meta.hardwareCost] }
				]
			: []
	);
</script>

{#if chips.length}
	<div class="flex flex-wrap gap-2">
		{#each chips as chip (chip.label)}
			<span class="border-input bg-muted/40 rounded-full border px-2.5 py-1 text-xs">
				<span class="text-muted-foreground">{chip.label}:</span>
				{chip.value}
			</span>
		{/each}
	</div>
	<p class="text-muted-foreground mt-1.5 text-xs">{t.costTiers.note}</p>
{/if}
