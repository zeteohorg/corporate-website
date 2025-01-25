<script lang="ts">
	import { page } from '$app/stores';
	let { children } = $props();
</script>

<article class="prose prose-slate mx-auto max-w-3xl px-4 py-8">
	<h1>{$page.data.title}</h1>
	<div class="text-sm text-gray-500 mb-8">
		Published on {new Date($page.data.date).toLocaleDateString()}
	</div>
	{@render children?.()}
</article>
