<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<article class="prose prose-slate mx-auto max-w-3xl px-4 py-8">
	<h1>{data.metadata.title}</h1>
	<div class="text-sm text-gray-500 mb-8">
		Published on {new Date(data.metadata.date).toLocaleDateString()}
	</div>
	{@html data.html}
</article>
