<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	let lang = $derived($page.params.lang ?? 'en');
	let t = $derived(translations[lang as keyof typeof translations]);

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let errors = $state<Record<string, string>>({});
	let submitted = $state(false);

	function validateForm() {
		errors = {};
		if (!name) errors.name = t.common.contact.errors?.required ?? 'Required';
		if (!email) errors.email = t.common.contact.errors?.required ?? 'Required';
		else if (!/\S+@\S+\.\S+/.test(email))
			errors.email = t.common.contact.errors?.invalidEmail ?? 'Invalid email';
		return Object.keys(errors).length === 0;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validateForm()) return;
		console.log('Form submitted:', { name, email, message });
		submitted = true;
	}
</script>

<section class="py-20">
	<div class="container mx-auto max-w-xl px-4">
		<h2 class="mb-12 text-center text-3xl font-bold">{t.common.contact.title}</h2>

		{#if submitted}
			<div class="rounded bg-green-100 p-4 text-center text-green-700">
				{t.common.contact.success}
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-6">
				<div>
					<label for="name" class="mb-1 block text-sm font-medium">{t.common.contact.name}</label>
					<Input
						type="text"
						id="name"
						bind:value={name}
						class={errors.name ? 'border-red-500' : ''}
					/>
					{#if errors.name}
						<p class="mt-1 text-sm text-red-500">{errors.name}</p>
					{/if}
				</div>

				<div>
					<label for="email" class="mb-1 block text-sm font-medium">{t.common.contact.email}</label>
					<Input
						type="email"
						id="email"
						bind:value={email}
						class={errors.email ? 'border-red-500' : ''}
					/>
					{#if errors.email}
						<p class="mt-1 text-sm text-red-500">{errors.email}</p>
					{/if}
				</div>

				<div>
					<label for="message" class="mb-1 block text-sm font-medium"
						>{t.common.contact.message}</label
					>
					<textarea id="message" bind:value={message} class="w-full rounded-md border p-2" rows="4"
					></textarea>
				</div>

				<button type="submit" class={buttonVariants({ variant: 'default', class: 'w-full' })}>
					{t.common.contact.submit}
				</button>
			</form>
		{/if}
	</div>
</section>
