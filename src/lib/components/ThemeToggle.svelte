<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { theme } from '$lib/stores/theme';
	import { buttonVariants } from './ui/button';
</script>

<button
	on:click={() => theme.toggle()}
	class={buttonVariants({ variant: 'ghost', size: 'icon' })}
	aria-label="Toggle theme"
>
	{#if $theme === 'dark'}
		<Sun class="h-5 w-5" />
	{:else}
		<Moon class="h-5 w-5" />
	{/if}
</button>
