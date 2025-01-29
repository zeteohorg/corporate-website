<script>
	import { page } from '$app/stores';
</script>

<main class="container grid min-h-full place-items-center px-6 py-24 sm:py-32">
	<h1 class="text-error text-center text-4xl font-bold">
		{$page.status}
	</h1>
	<div>
		<p class="text-base-content/80 mt-4 text-center text-lg">
			{#if $page.status === 404}
				The page you are looking for does not exist.
			{:else}
				An error occurred.
			{/if}
		</p>
		<p class="mt-10 text-center">
			<a href="/" class="btn">Go back home</a>
		</p>
	</div>
</main>
