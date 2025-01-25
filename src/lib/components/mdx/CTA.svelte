<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let {
		href,
		variant = 'default',
		size = 'lg',
		class: className,
		children
	}: {
		href: string;
		variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
		size?: 'default' | 'sm' | 'lg' | 'icon';
		class?: string;
		children?: any;
	} = $props();
</script>

<div class="my-8 text-center">
	<a {href} class={cn(buttonVariants({ variant, size }), className)}>
		{@render children?.()}
	</a>
</div>
