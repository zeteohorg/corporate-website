<script lang="ts">
	import OptionCard from './OptionCard.svelte';

	interface Option {
		value: string;
		label: string;
		example?: string;
	}

	interface Props {
		title: string;
		hint?: string;
		/** Engine-blind trust note (budget step only) shown under the title. */
		trustNote?: string;
		options: Option[];
		/** Current answer: a value (single) or array of values (multi). */
		value: string | string[] | undefined;
		multi: boolean;
		onselect: (value: string) => void;
	}

	let { title, hint, trustNote, options, value, multi, onselect }: Props = $props();

	function isSelected(v: string): boolean {
		return Array.isArray(value) ? value.includes(v) : value === v;
	}
</script>

<div>
	<h2 class="text-2xl font-bold sm:text-3xl">{title}</h2>
	{#if hint}
		<p class="text-muted-foreground mt-1 text-sm">{hint}</p>
	{/if}
	{#if trustNote}
		<p class="text-muted-foreground mt-1 text-sm">{trustNote}</p>
	{/if}

	<div class="mt-6 grid gap-3 sm:grid-cols-2">
		{#each options as opt (opt.value)}
			<OptionCard
				label={opt.label}
				example={opt.example}
				selected={isSelected(opt.value)}
				{multi}
				onselect={() => onselect(opt.value)}
			/>
		{/each}
	</div>
</div>
