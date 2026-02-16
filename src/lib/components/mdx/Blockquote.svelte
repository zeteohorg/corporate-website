<script lang="ts">
	import { Quote } from 'lucide-svelte';
	import { cn } from '$lib/utils';

	let { class: className, children } = $props<{
		class?: string;
		children?: any;
	}>();
</script>

<blockquote
	class={cn('border-primary [&>*]:text-muted-foreground my-6 border-l-4 pl-6 italic', className)}
>
	<div class="flex gap-2">
		<Quote class="text-primary size-5" />
		{@html children}
	</div>
</blockquote>
