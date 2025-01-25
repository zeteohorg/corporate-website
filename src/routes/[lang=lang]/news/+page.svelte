<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	export let data: PageData;
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-8">News</h1>
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post}
			<a
				href="/{$page.params.lang}/news/{post.slug}"
				class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
			>
				<h2 class="text-2xl font-semibold mb-2">{post.title}</h2>
				<p class="text-gray-600 mb-4">{post.description}</p>
				<time class="text-sm text-gray-500">
					{new Date(post.date).toLocaleDateString()}
				</time>
			</a>
		{/each}
	</div>
</div>
