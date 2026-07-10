<script lang="ts">
	import { cn } from '$lib/utils';
	import { Check } from 'lucide-svelte';

	interface Props {
		label: string;
		example?: string;
		selected: boolean;
		multi?: boolean;
		onselect: () => void;
	}

	let { label, example, selected, multi = false, onselect }: Props = $props();
</script>

<!-- Native <button> → Enter/Space work for free (avoids the a11y hotspot gap
     flagged in review §5.8). aria-pressed communicates toggle state. -->
<button
	type="button"
	aria-pressed={selected}
	onclick={onselect}
	class={cn(
		'group flex min-h-[64px] w-full items-center gap-3 rounded-lg border-2 px-5 py-4 text-left transition-colors',
		'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
		selected
			? 'border-primary bg-primary/5'
			: 'border-input hover:border-primary/50 hover:bg-accent/40 bg-card'
	)}
>
	<span
		class={cn(
			'flex size-6 shrink-0 items-center justify-center border-2 transition-colors',
			multi ? 'rounded' : 'rounded-full',
			selected ? 'border-primary bg-primary text-primary-foreground' : 'border-input'
		)}
	>
		{#if selected}
			<Check class="size-4" strokeWidth={3} />
		{/if}
	</span>
	<span class="flex flex-col">
		<span class="text-base font-medium">{label}</span>
		{#if example}
			<span class="text-muted-foreground text-sm">{example}</span>
		{/if}
	</span>
</button>
