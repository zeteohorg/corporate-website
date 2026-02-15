<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { browser } from '$app/environment';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].common.contact);

	let submitted = $state(false);
	let formEl = $state<HTMLFormElement | null>(null);

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!browser || !formEl) return;

		const formData = new FormData(formEl);

		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(formData as any).toString()
		})
			.then(() => {
				submitted = true;
				formEl.reset();
			})
			.catch((error) => {
				console.error('Form submission error:', error);
			});
	}
</script>

<section class="py-12 sm:py-16 lg:py-20" id="contact" aria-labelledby="contact-heading">
	<div class="container px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-xl">
			<h2
				id="contact-heading"
				class="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl"
			>
				{t.title}
			</h2>

			{#if submitted}
				<div class="bg-primary/10 rounded-md p-4 text-center" role="alert">
					<p class="text-foreground">{t.success}</p>
				</div>
			{:else}
				<form
					bind:this={formEl}
					onsubmit={onSubmit}
					name="contact-form"
					data-netlify="true"
					netlify-honeypot="bot-field"
					class="space-y-6 sm:space-y-8"
				>
					<input type="hidden" name="form-name" value="contact-form" />
					<input type="hidden" name="lang" value={currentLanguage} />

					<div class="hidden" aria-hidden="true">
						<label>
							Don't fill this out if you're human:
							<input name="bot-field" />
						</label>
					</div>

					<!-- Name field -->
					<div class="space-y-2">
						<label for="name" class="text-sm leading-none font-medium">
							{t.name} <span class="text-destructive">*</span>
						</label>
						<Input
							type="text"
							id="name"
							name="name"
							autocomplete="name"
							minlength="2"
							required
							aria-required="true"
						/>
					</div>

					<!-- Email field -->
					<div class="space-y-2">
						<label for="email" class="text-sm leading-none font-medium">
							{t.email} <span class="text-destructive">*</span>
						</label>
						<Input
							type="email"
							id="email"
							name="email"
							autocomplete="email"
							required
							aria-required="true"
						/>
					</div>

					<!-- Company field -->
					<div class="space-y-2">
						<label for="company" class="text-sm leading-none font-medium">
							{t.company} <span class="text-destructive">*</span>
						</label>
						<Input
							type="text"
							id="company"
							name="company"
							autocomplete="organization"
							required
							aria-required="true"
						/>
					</div>

					<!-- Job Title field -->
					<div class="space-y-2">
						<label for="jobTitle" class="text-sm leading-none font-medium">
							{t.jobTitle}
						</label>
						<Input type="text" id="jobTitle" name="job-title" autocomplete="organization-title" />
					</div>

					<!-- Inquiry Type field -->
					<div class="space-y-2">
						<label for="inquiryType" class="text-sm leading-none font-medium">
							{t.inquiryType.label} <span class="text-destructive">*</span>
						</label>
						<select
							id="inquiryType"
							name="inquiry-type"
							class="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							required
							aria-required="true"
						>
							<option value="">{t.inquiryType.placeholder}</option>
							<option value="demo">{t.inquiryType.options.demo}</option>
							<option value="vendor">{t.inquiryType.options.vendor}</option>
							<option value="other">{t.inquiryType.options.other}</option>
						</select>
					</div>

					<!-- Message field -->
					<div class="space-y-2">
						<label for="message" class="text-sm leading-none font-medium">
							{t.message}
						</label>
						<textarea
							id="message"
							name="message"
							class="border-input bg-background ring-offset-background focus-visible:ring-ring min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							rows="4"
						></textarea>
					</div>

					<div class="text-muted-foreground text-sm">
						<span class="text-destructive">*</span>
						{t.required}
					</div>

					<Button
						type="submit"
						class="min-h-[44px] w-full text-base sm:min-h-[48px] sm:w-auto"
						disabled={submitted}
					>
						{t.submit}
					</Button>
				</form>
			{/if}
		</div>
	</div>
</section>
