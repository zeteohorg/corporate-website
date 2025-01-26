<script lang="ts">
	import { Quote } from 'lucide-svelte';
	import { cn } from '$lib/utils';

	let { class: className, children } = $props<{
		class?: string;
		children?: any;
	}>();
</script>

<blockquote
	class={cn('my-6 border-l-4 border-primary pl-6 italic [&>*]:text-muted-foreground', className)}
>
	<div class="flex gap-2">
		<Quote class="size-5 text-primary" />
		{@html children}
	</div>
</blockquote>
