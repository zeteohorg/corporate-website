<script lang="ts">
	import { cn } from '$lib/utils';

	interface Bar {
		name: string;
		fit: number; // 0–100
		primary?: boolean;
	}
	interface Props {
		bars: Bar[];
		fitLabel: string;
	}
	let { bars, fitLabel }: Props = $props();
</script>

<div class="space-y-3" aria-label={fitLabel}>
	{#each bars as bar (bar.name)}
		<div>
			<div class="mb-1 flex justify-between text-sm">
				<span class={cn('font-medium', bar.primary && 'text-primary')}>{bar.name}</span>
				<span class="text-muted-foreground tabular-nums">{bar.fit}</span>
			</div>
			<div class="bg-muted h-2.5 w-full overflow-hidden rounded-full">
				<div
					class={cn('h-full rounded-full', bar.primary ? 'bg-primary' : 'bg-muted-foreground/50')}
					style="width: {bar.fit}%"
				></div>
			</div>
		</div>
	{/each}
</div>
