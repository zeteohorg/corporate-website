<script lang="ts">
	interface Props {
		current: number; // 1-based
		total: number;
		label: string;
	}
	let { current, total, label }: Props = $props();
	const pct = $derived(Math.round((current / total) * 100));
</script>

<div class="mb-8">
	<div class="text-muted-foreground mb-2 flex justify-between text-sm font-medium">
		<span>{label}</span>
		<span>{pct}%</span>
	</div>
	<div class="bg-muted h-2 w-full overflow-hidden rounded-full">
		<div
			class="bg-primary h-full rounded-full transition-all duration-300 ease-out"
			style="width: {pct}%"
			role="progressbar"
			aria-valuenow={current}
			aria-valuemin={0}
			aria-valuemax={total}
		></div>
	</div>
</div>
