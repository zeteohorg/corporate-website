<script lang="ts">
	let {
		label,
		hint,
		items
	}: {
		label: string;
		hint: string;
		items: Array<{ label: string; href: string }>;
	} = $props();

	let open = $state(false);
	let root: HTMLDivElement;

	function onFocusOut(event: FocusEvent) {
		if (!root.contains(event.relatedTarget as Node | null)) open = false;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			open = false;
			root.querySelector('button')?.focus();
		}
	}
</script>

<div
	bind:this={root}
	class="relative"
	role="presentation"
	onfocusout={onFocusOut}
	onkeydown={onKeydown}
	onmouseleave={() => (open = false)}
>
	<button
		type="button"
		class="text-z-text hover:bg-accent focus-visible:outline-z-accent inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium focus-visible:outline-2"
		aria-expanded={open}
		aria-controls="products-menu"
		onclick={() => (open = !open)}
	>
		{label}
		<svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clip-rule="evenodd"
			/>
		</svg>
		<span class="text-z-text-caption text-xs">({hint})</span>
	</button>

	<ul
		id="products-menu"
		class="bg-z-bg border-z-border absolute top-full left-0 z-10 mt-1 min-w-44 rounded-lg border p-1 shadow-lg"
		hidden={!open}
	>
		{#each items as item (item.href)}
			<li>
				<a
					href={item.href}
					class="text-z-text hover:bg-z-bg-sub focus-visible:outline-z-accent flex min-h-11 items-center rounded-md px-3 text-sm font-medium focus-visible:outline-2"
					onclick={() => (open = false)}
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</div>
