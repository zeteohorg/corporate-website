<script lang="ts">
	const { t } = $props<{ t: any }>();

	$effect(() => {
		const infoItems = [
			t.company.info.companyName,
			t.company.info.founded,
			t.company.info.capital,
			t.company.info.location,
			t.company.info.business
		];
		return infoItems;
	});
</script>

<div class="mx-auto max-w-4xl px-4 py-16">
	<h2 class="mb-8 text-3xl font-bold">{t.company.info.title}</h2>
	<div class="space-y-6">
		<div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
			<dl class="divide-y divide-gray-200 dark:divide-gray-700">
				<div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
						{t.company.info.companyName.label}
					</dt>
					<dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
						{t.company.info.companyName.value}
					</dd>
				</div>
				<div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
						{t.company.info.founded.label}
					</dt>
					<dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
						{t.company.info.founded.value}
					</dd>
				</div>
				<div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
						{t.company.info.capital.label}
					</dt>
					<dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
						{t.company.info.capital.value}
					</dd>
				</div>
				<div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
						{t.company.info.location.label}
					</dt>
					<dd
						class="mt-1 whitespace-pre-line text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0"
					>
						{t.company.info.location.value}
					</dd>
				</div>
				<div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
						{t.company.info.business.label}
					</dt>
					<dd
						class="mt-1 whitespace-pre-line text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0"
					>
						{t.company.info.business.value}
					</dd>
				</div>
			</dl>
		</div>
	</div>
</div>
