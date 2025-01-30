<script lang="ts">
	import type { PrivacyPolicyTranslation } from '$lib/i18n/types';

	export let t: PrivacyPolicyTranslation;
</script>

<div class="min-h-screen bg-black text-white">
	<div class="container mx-auto max-w-4xl px-4 py-12">
		<h1 class="mb-8 text-4xl font-bold">{t.title}</h1>

		<div class="prose prose-invert max-w-none">
			<p class="mb-8 text-gray-300">{t.intro}</p>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold text-white">{t.information.title}</h2>
				<p class="text-gray-300">{t.information.description}</p>
			</section>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold text-white">{t.usage.title}</h2>
				<p class="text-gray-300">{t.usage.description}</p>
				<ul class="mt-4 list-disc pl-6 text-gray-300">
					{#each t.usage.purposes as purpose}
						<li>{purpose}</li>
					{/each}
				</ul>
			</section>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold text-white">{t.sharing.title}</h2>
				<p class="text-gray-300">{t.sharing.description}</p>
			</section>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold text-white">{t.cookies.title}</h2>
				<p class="text-gray-300">{t.cookies.description}</p>
			</section>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold text-white">{t.rights.title}</h2>
				<p class="text-gray-300">{t.rights.description}</p>
			</section>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold text-white">{t.updates.title}</h2>
				<p class="text-gray-300">{t.updates.description}</p>
			</section>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold text-white">{t.contact.title}</h2>
				<p class="mb-2 text-gray-300">{t.contact.address}</p>
				<p class="text-gray-300">Email: {t.contact.email}</p>
			</section>

			<p class="mt-12 text-sm text-gray-400">{t.lastUpdate}</p>
		</div>
	</div>
</div>
