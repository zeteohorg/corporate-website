<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { trackClick } from '$lib/analytics';
	import type { Lang } from '$lib/data/solution-finder/types';
	import { ArrowRight } from 'lucide-svelte';

	interface Props {
		lang: Lang;
		heading: string;
		text: string;
		button: string;
		/** Analytics label for entry-point attribution. */
		location: string;
	}
	let { lang, heading, text, button, location }: Props = $props();
</script>

<aside
	class="border-primary/30 bg-primary/5 my-10 flex flex-col items-start gap-4 rounded-xl border p-6 sm:flex-row sm:items-center sm:justify-between"
>
	<div>
		<h2 class="text-xl font-bold">{heading}</h2>
		<p class="text-muted-foreground mt-1 text-sm">{text}</p>
	</div>
	<a
		href={`/${lang}/solution-finder/?utm_source=site&utm_medium=cta&utm_campaign=${location}`}
		class={`${buttonVariants({ size: 'lg' })} shrink-0`}
		use:trackClick={{ name: 'Finder: CTA', props: { location } }}
	>
		{button}
		<ArrowRight class="ml-2 size-4" />
	</a>
</aside>
