<script lang="ts">
	import { translations } from '$lib/i18n/translations';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const t = translations[data.lang];
</script>

<div class="container mx-auto max-w-4xl px-4 py-8">
	<slot />
</div>
