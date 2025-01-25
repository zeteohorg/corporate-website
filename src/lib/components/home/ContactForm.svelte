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

<section class="py-12 sm:py-16 lg:py-20">
	<div class="container px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-xl">
			<h2 class="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl">
				{t.common.contact.title}
			</h2>

			{#if submitted}
				<div
					class="rounded-lg bg-green-100 p-4 text-center text-green-700 dark:bg-green-900 dark:text-green-100 sm:p-6"
				>
					{t.common.contact.success}
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="space-y-6 sm:space-y-8">
					<div class="space-y-2">
						<label
							for="name"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{t.common.contact.name}
						</label>
						<Input
							type="text"
							id="name"
							bind:value={name}
							class={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
							aria-invalid={errors.name ? 'true' : undefined}
							aria-describedby={errors.name ? 'name-error' : undefined}
							autocomplete="name"
							minlength="2"
							required
						/>
						{#if errors.name}
							<p id="name-error" class="text-sm text-red-500">
								{errors.name}
							</p>
						{/if}
					</div>

					<div class="space-y-2">
						<label
							for="email"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{t.common.contact.email}
						</label>
						<Input
							type="email"
							id="email"
							bind:value={email}
							class={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
							aria-invalid={errors.email ? 'true' : undefined}
							aria-describedby={errors.email ? 'email-error' : undefined}
							autocomplete="email"
							required
						/>
						{#if errors.email}
							<p id="email-error" class="text-sm text-red-500">
								{errors.email}
							</p>
						{/if}
					</div>

					<div class="space-y-2">
						<label
							for="message"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{t.common.contact.message}
						</label>
						<textarea
							id="message"
							bind:value={message}
							class="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							rows="4"
							aria-label={t.common.contact.message}
						></textarea>
					</div>

					<button
						type="submit"
						class={buttonVariants({
							variant: 'default',
							class: 'min-h-[44px] w-full text-base sm:min-h-[48px] sm:w-auto'
						})}
					>
						{t.common.contact.submit}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>
