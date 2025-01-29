<script lang="ts">
	import { onMount } from 'svelte';
	import type { TableOfContentsItem } from '$lib/types';
	import { cn } from '$lib/utils';

	let { items } = $props<{ items: TableOfContentsItem[] }>();
	let activeId = $state<string | null>(null);

	// Update active section based on scroll position
	function updateActiveSection() {
		const sections = items.map((item) => ({
			id: item.id,
			element: document.getElementById(item.id)
		}));

		const visibleSections = sections
			.filter(({ element }) => {
				if (!element) return false;
				const rect = element.getBoundingClientRect();
				return rect.top <= 100 && rect.bottom >= 100;
			})
			.map(({ id }) => id);

		activeId = visibleSections[0] || null;
	}

	onMount(() => {
		window.addEventListener('scroll', updateActiveSection, { passive: true });
		return () => window.removeEventListener('scroll', updateActiveSection);
	});
</script>

{#if items.length > 0}
	<nav class="rounded-lg border bg-card p-4 text-card-foreground">
		<h2 class="mb-4 text-sm font-semibold">On this page</h2>
		<ul class="space-y-2.5 text-sm">
			{#each items as item}
				<li style:padding-left={`${(item.level - 2) * 1}rem`}>
					<a
						href={`#${item.id}`}
						class={cn(
							'inline-block transition-colors hover:text-foreground',
							activeId === item.id ? 'font-medium text-foreground' : 'text-muted-foreground'
						)}
					>
						{item.title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
