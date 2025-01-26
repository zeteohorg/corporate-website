<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className, children } = $props<{
		class?: string;
		children?: string;
	}>();
</script>

<div class="my-6 w-full overflow-y-auto">
	<table
		class={cn(
			'w-full border-collapse text-sm [&_td]:p-2 [&_th]:p-2 [&_tr:nth-child(even)]:bg-muted',
			className
		)}
	>
		{@html children}
	</table>
</div>
