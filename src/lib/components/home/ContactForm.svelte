<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	let lang = $derived($page.params.lang ?? 'en');
	let t = $derived(translations[lang].common.contact);

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let jobTitle = $state('');
	let inquiryType = $state('');
	let message = $state('');
	let errors = $state<Record<string, string>>({});
	let submitted = $state(false);

	function validateForm() {
		errors = {};
		if (!name) errors.name = t.errors.required;
		if (!email) errors.email = t.errors.required;
		else if (!/\S+@\S+\.\S+/.test(email)) errors.email = t.errors.invalidEmail;
		if (!company) errors.company = t.errors.required;
		if (!inquiryType) errors.inquiryType = t.errors.required;
		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    
    if (!validateForm()) return;

    const formData = new FormData(event.target as HTMLFormElement);

    try {
        const response = await fetch("/", {  // Changed to use root path
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData as any).toString()
        });
        
        if (response.ok) {
            submitted = true;
        } else {
            console.error('Form submission failed:', response.status);
        }
    } catch (error) {
        console.error('Form submission error:', error);
    }
}
</script>

<section class="py-12 sm:py-16 lg:py-20">
	<div class="container px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-xl">
			<h2 class="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl">
				{t.title}
			</h2>
			{#if submitted}
				<div
					class="rounded-lg bg-green-100 p-4 text-center text-green-700 dark:bg-green-900 dark:text-green-100 sm:p-6"
				>
					{t.success}
				</div>
			{:else}
				<form
					name="contact"
					method="POST"
					data-netlify="true"
					netlify-honeypot="bot-field"
					onsubmit={handleSubmit}
					class="space-y-6 sm:space-y-8"
				>
					<input type="hidden" name="form-name" value="contact" />
					<p class="hidden">
						<label>
							Don't fill this out if you're human: <input name="bot-field" />
						</label>
					</p>

					<div class="space-y-2">
						<label for="name" class="text-sm font-medium leading-none">
							{t.name} <span class="text-red-500">*</span>
						</label>
						<Input
							type="text"
							id="name"
							name="name"
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
						<label for="email" class="text-sm font-medium leading-none">
							{t.email} <span class="text-red-500">*</span>
						</label>
						<Input
							type="email"
							id="email"
							name="email"
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
						<label for="company" class="text-sm font-medium leading-none">
							{t.company} <span class="text-red-500">*</span>
						</label>
						<Input
							type="text"
							id="company"
							name="company"
							bind:value={company}
							class={errors.company ? 'border-red-500 focus-visible:ring-red-500' : ''}
							aria-invalid={errors.company ? 'true' : undefined}
							aria-describedby={errors.company ? 'company-error' : undefined}
							autocomplete="organization"
							required
						/>
						{#if errors.company}
							<p id="company-error" class="text-sm text-red-500">
								{errors.company}
							</p>
						{/if}
					</div>

					<div class="space-y-2">
						<label for="jobTitle" class="text-sm font-medium leading-none">
							{t.jobTitle}
						</label>
						<Input
							type="text"
							id="jobTitle"
							name="job-title"
							bind:value={jobTitle}
							class={errors.jobTitle ? 'border-red-500 focus-visible:ring-red-500' : ''}
							aria-invalid={errors.jobTitle ? 'true' : undefined}
							aria-describedby={errors.jobTitle ? 'jobTitle-error' : undefined}
							autocomplete="organization-title"
						/>
						{#if errors.jobTitle}
							<p id="jobTitle-error" class="text-sm text-red-500">
								{errors.jobTitle}
							</p>
						{/if}
					</div>

					<div class="space-y-2">
						<label for="inquiryType" class="text-sm font-medium leading-none">
							{t.inquiryType.label} <span class="text-red-500">*</span>
						</label>
						<select
							id="inquiryType"
							name="inquiry-type"
							bind:value={inquiryType}
							class={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
								errors.inquiryType ? 'border-red-500 focus-visible:ring-red-500' : 'border-input'
							}`}
							required
						>
							<option value="">{t.inquiryType.placeholder}</option>
							<option value="demo">{t.inquiryType.options.demo}</option>
							<option value="vendor">{t.inquiryType.options.vendor}</option>
							<option value="other">{t.inquiryType.options.other}</option>
						</select>
						{#if errors.inquiryType}
							<p id="inquiryType-error" class="text-sm text-red-500">
								{errors.inquiryType}
							</p>
						{/if}
					</div>

					<div class="space-y-2">
						<label for="message" class="text-sm font-medium leading-none">
							{t.message}
						</label>
						<textarea
							id="message"
							name="message"
							bind:value={message}
							class={`min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
								errors.message ? 'border-red-500 focus-visible:ring-red-500' : 'border-input'
							}`}
							rows="4"
						></textarea>
						{#if errors.message}
							<p id="message-error" class="text-sm text-red-500">
								{errors.message}
							</p>
						{/if}
					</div>

					<div class="text-sm text-muted-foreground">
						<span class="text-red-500">*</span>
						{t.required}
					</div>

					<button
						type="submit"
						class={buttonVariants({
							variant: 'default',
							class: 'min-h-[44px] w-full text-base sm:min-h-[48px] sm:w-auto'
						})}
					>
						{t.submit}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>
