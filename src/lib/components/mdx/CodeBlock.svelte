<script lang="ts">
	import { onMount } from 'svelte';
	import { Copy } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let {
		code,
		language = '',
		filename = ''
	} = $props<{
		code: string;
		language?: string;
		filename?: string;
	}>();

	let copied = $state(false);

	async function copyCode() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	onMount(async () => {
		const Prism = (await import('prismjs')).default;

		// Import core languages
		await Promise.all([
			import('prismjs/components/prism-typescript'),
			import('prismjs/components/prism-javascript'),
			import('prismjs/components/prism-css'),
			import('prismjs/components/prism-json'),
			import('prismjs/components/prism-markdown')
		]);

		// For Svelte syntax, use XML/HTML highlighting as fallback
		await import('prismjs/components/prism-markup');
		if (language === 'svelte') {
			language = 'markup';
		}

		Prism.highlightAll();
	});
</script>

<div class="bg-muted relative my-6 overflow-hidden rounded-lg">
	{#if filename}
		<div
			class="bg-muted text-muted-foreground flex items-center justify-between border-b px-4 py-2 text-sm"
		>
			<span>{filename}</span>
		</div>
	{/if}
	<div class="group relative">
		<button
			onclick={copyCode}
			class={cn(
				buttonVariants({ variant: 'ghost', size: 'icon' }),
				'absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100'
			)}
			aria-label="Copy code"
		>
			<Copy class={cn('size-4', copied ? 'text-green-500' : '')} />
		</button>
		<pre class={cn('overflow-x-auto px-4 py-3', filename ? '' : 'pt-4')}><code
				class={`language-${language}`}>{code}</code
			></pre>
	</div>
</div>
