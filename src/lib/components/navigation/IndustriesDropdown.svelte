<script lang="ts">
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import { ChevronDown } from 'lucide-svelte';

	const industries = [
		'construction',
		'healthcare',
		'logistics',
		'manufacturing',
		'energy',
		'retail'
	] as const;

	let { lang, translations } = $props();
	let isOpen = $state(false);
</script>

<div class="relative" onmouseleave={() => (isOpen = false)}>
	<button
		class={cn(buttonVariants({ variant: 'ghost' }), 'gap-1')}
		onmouseenter={() => (isOpen = true)}
		aria-expanded={isOpen}
	>
		<span>{translations.common.nav.industries.title}</span>
		<ChevronDown class="h-4 w-4" />
	</button>

	{#if isOpen}
		<div
			class="absolute left-0 top-full z-50 mt-1 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
		>
			{#each industries as industry}
				<a
					href="/{lang}/industries/{industry}"
					class={cn(
						buttonVariants({ variant: 'ghost' }),
						'relative w-full justify-start text-sm font-normal'
					)}
				>
					{translations.common.nav.industries[industry]}
				</a>
			{/each}
		</div>
	{/if}
</div>
