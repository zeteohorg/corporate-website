<script lang="ts">
	import { cn } from '$lib/utils';
	import * as Alert from '$lib/components/ui/alert';
	import { Info, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-svelte';

	let {
		type = 'info',
		title,
		children
	}: {
		type?: 'info' | 'warning' | 'error' | 'success';
		title?: string;
		children?: any;
	} = $props();

	const icons = {
		info: Info,
		warning: AlertTriangle,
		error: AlertCircle,
		success: CheckCircle2
	};

	const variants = {
		info: 'default',
		warning: 'default',
		error: 'destructive',
		success: 'default'
	};

	const styles = {
		info: 'border-blue-200 dark:border-blue-800 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400',
		warning:
			'border-amber-200 dark:border-amber-800 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400',
		error: '', // Using destructive variant
		success:
			'border-green-200 dark:border-green-800 [&>svg]:text-green-600 dark:[&>svg]:text-green-400'
	};

	const Icon = icons[type];
</script>

<Alert.Root variant={variants[type]} class={cn('my-6', styles[type])}>
	<Icon class="size-4" />
	{#if title}
		<Alert.Title>{title}</Alert.Title>
	{/if}
	<Alert.Description>
		{@render children?.()}
	</Alert.Description>
</Alert.Root>
