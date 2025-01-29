<script lang="ts">
	import type { PrivacyPolicyTranslation } from '$lib/i18n/types';

	export let t: PrivacyPolicyTranslation;
</script>

<svelte:head>
	<title>{t.title}</title>
	<meta name="description" content={t.intro} />
</svelte:head>

<div class="container mx-auto max-w-4xl px-4 py-8">
	<article class="prose mx-auto dark:prose-invert lg:prose-lg">
		<h1>{t.title}</h1>

		<p>{t.intro}</p>

		<section>
			<h2>{t.information.title}</h2>
			<p>{t.information.description}</p>
		</section>

		<section>
			<h2>{t.usage.title}</h2>
			<p>{t.usage.description}</p>
			<ul>
				{#each t.usage.purposes as purpose}
					<li>{purpose}</li>
				{/each}
			</ul>
		</section>

		<section>
			<h2>{t.sharing.title}</h2>
			<p>{t.sharing.description}</p>
		</section>

		<section>
			<h2>{t.cookies.title}</h2>
			<p>{t.cookies.description}</p>
		</section>

		<section>
			<h2>{t.rights.title}</h2>
			<p>{t.rights.description}</p>
		</section>

		<section>
			<h2>{t.updates.title}</h2>
			<p>{t.updates.description}</p>
		</section>

		<section>
			<h2>{t.contact.title}</h2>
			<address class="not-italic">
				<p>{t.contact.address}</p>
				<p>Email: <a href="mailto:{t.contact.email}">{t.contact.email}</a></p>
			</address>
		</section>

		<footer class="mt-8 text-sm text-muted-foreground">
			<p>{t.lastUpdate}</p>
		</footer>
	</article>
</div>

<style lang="postcss">
	article section {
		@apply mb-8;
	}

	article section:last-child {
		@apply mb-0;
	}
</style>
