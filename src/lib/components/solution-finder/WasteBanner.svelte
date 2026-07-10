<script lang="ts">
	import { interpolate, formatJpy } from './format';
	import type { Lang } from '$lib/data/solution-finder/types';

	interface Props {
		annualLoss: number;
		lang: Lang;
		headline: string; // contains {amount}
		note: string;
	}
	let { annualLoss, lang, headline, note }: Props = $props();
	const text = $derived(interpolate(headline, { amount: formatJpy(annualLoss, lang) }));
</script>

<div class="border-primary/30 bg-primary/5 rounded-lg border p-5">
	<p class="text-lg font-semibold text-balance">{text}</p>
	<p class="text-muted-foreground mt-1 text-sm">{note}</p>
</div>
