<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { translations } from '$lib/i18n/translations';
	import { trackEvent } from '$lib/analytics';
	import { cn } from '$lib/utils';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.poc);
	const f = $derived(t.form);
	const contact = $derived(translations[lang].common.contact);

	// Option values: existing ones are kept so past submissions and notification
	// routing keep working; astra_poc is new and the default.
	const INQUIRY_VALUES = ['astra_poc', 'demo', 'vendor', 'other'] as const;
	const SITE_TYPES = ['factory', 'construction', 'warehouse', 'infrastructure', 'other'] as const;
	const HEADCOUNTS = [
		['', 'none'],
		['1-20', 'small'],
		['21-100', 'medium'],
		['101+', 'large']
	] as const;
	const SOURCES = ['search', 'social-media', 'ai-assistant', 'referral', 'event', 'other'] as const;
	const SOURCE_LABELS = {
		search: 'search',
		'social-media': 'socialMedia',
		'ai-assistant': 'aiAssistant',
		referral: 'referral',
		event: 'event',
		other: 'other'
	} as const;

	// Netlify Forms attribute (not a standard HTML attribute, so spread to keep types clean)
	const NETLIFY_FORM_ATTRS = { 'netlify-honeypot': 'bot-field' };

	const PERSON_FIELDS = [
		{ id: 'name', type: 'text', autocomplete: 'name' },
		{ id: 'email', type: 'email', autocomplete: 'email' }
	] as const;

	type Field = 'name' | 'email' | 'company';
	let errors = $state<Partial<Record<Field, string>>>({});
	let sending = $state(false);
	let submitted = $state(false);
	let sendFailed = $state(false);
	let formEl = $state<HTMLFormElement | null>(null);

	function validate(data: FormData) {
		const next: Partial<Record<Field, string>> = {};
		for (const field of ['name', 'email', 'company'] as const) {
			if (!String(data.get(field) ?? '').trim()) next[field] = contact.errors.required;
		}
		const email = String(data.get('email') ?? '').trim();
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			next.email = contact.errors.invalidEmail;
		return next;
	}

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!browser || !formEl || sending) return;

		const data = new FormData(formEl);
		errors = validate(data);
		const first = (['name', 'email', 'company'] as const).find((k) => errors[k]);
		if (first) {
			await tick();
			formEl.querySelector<HTMLElement>(`#poc-${first}`)?.focus();
			return;
		}

		sending = true;
		sendFailed = false;
		try {
			const response = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(data as unknown as Record<string, string>).toString()
			});
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			// Only categorical values go to analytics, never what people typed
			trackEvent('Contact Form: Submit', {
				inquiry_type: String(data.get('inquiry-type') ?? ''),
				hear_about_us: String(data.get('hear-about-us') ?? ''),
				lang
			});
			submitted = true;
		} catch (error) {
			console.error('Form submission error:', error);
			sendFailed = true;
		} finally {
			sending = false;
		}
	}

	const inputClass =
		'border-z-border-strong bg-z-bg text-z-text h-12 w-full rounded-md border px-3 text-[16px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-z-accent lg:h-11';
	const labelClass = 'mb-1.5 block text-[14px] font-bold';
</script>

{#snippet targetsBlock()}
	<ul class="text-z-text-sub space-y-2 text-[14px] leading-[1.6] lg:text-[15px]">
		{#each t.targets as target (target)}
			<li class="flex gap-2"><span aria-hidden="true">・</span><span>{target}</span></li>
		{/each}
	</ul>
{/snippet}

{#snippet flowBlock()}
	<ol class="flex flex-wrap gap-2">
		{#each t.flow as step, i (step)}
			<li class="bg-z-bg-sub rounded-md px-3 py-2 text-[13px]">
				<span class="font-z-mono">{i + 1}</span>
				{step}
			</li>
		{/each}
	</ol>
{/snippet}

<section id="poc" aria-labelledby="poc-heading" class="bg-z-bg text-z-text z-section">
	<div class="z-container grid gap-8 lg:grid-cols-2 lg:gap-12">
		<div>
			<p class="z-eyebrow text-z-accent-text">{t.eyebrow}</p>
			<h2 id="poc-heading" tabindex="-1" class="z-h2 mt-2 outline-none">{t.title}</h2>
			<p class="z-lead text-z-text-sub mt-3 lg:mt-4">{t.lead}</p>

			<!-- PC: always open -->
			<div class="hidden lg:block">
				<h3 class="mt-8 text-[17px] font-bold">{t.targetsTitle}</h3>
				<div class="mt-3">{@render targetsBlock()}</div>
				<h3 class="mt-8 text-[17px] font-bold">{t.flowTitle}</h3>
				<div class="mt-3">{@render flowBlock()}</div>
			</div>

			<!-- Phone/tablet: collapsed by default -->
			<div class="border-z-border mt-6 divide-y border-y lg:hidden">
				<details class="group">
					<summary
						class="flex min-h-12 cursor-pointer list-none items-center justify-between text-[15px] font-bold"
					>
						{t.targetsTitle}
						<span aria-hidden="true" class="transition-transform group-open:rotate-180">⌄</span>
					</summary>
					<div class="pb-4">{@render targetsBlock()}</div>
				</details>
				<details class="group">
					<summary
						class="flex min-h-12 cursor-pointer list-none items-center justify-between text-[15px] font-bold"
					>
						{t.flowTitle}
						<span aria-hidden="true" class="transition-transform group-open:rotate-180">⌄</span>
					</summary>
					<div class="pb-4">{@render flowBlock()}</div>
				</details>
			</div>
		</div>

		<div class="border-z-border rounded-xl border p-5 md:p-7">
			{#if submitted}
				<div class="bg-z-bg-sub rounded-md p-4 text-center" role="status">
					<p>{contact.success}</p>
				</div>
			{:else}
				<form
					bind:this={formEl}
					onsubmit={onSubmit}
					name="contact-form"
					method="POST"
					data-netlify="true"
					{...NETLIFY_FORM_ATTRS}
					novalidate
					class="space-y-5"
				>
					<input type="hidden" name="form-name" value="contact-form" />
					<input type="hidden" name="lang" value={lang} />
					<p class="hidden" aria-hidden="true">
						<label>
							Don't fill this out if you're human:
							<input name="bot-field" tabindex="-1" autocomplete="off" />
						</label>
					</p>

					<div>
						<label for="poc-inquiry" class={labelClass}>
							{f.inquiryType} <span class="text-z-accent-text">*</span>
						</label>
						<select id="poc-inquiry" name="inquiry-type" class={inputClass} required>
							{#each INQUIRY_VALUES as value (value)}
								<option {value} selected={value === 'astra_poc'}>{f.inquiryOptions[value]}</option>
							{/each}
						</select>
					</div>

					<div class="grid gap-5 md:grid-cols-2 md:gap-4">
						{#each PERSON_FIELDS as { id, type, autocomplete } (id)}
							<div>
								<label for="poc-{id}" class={labelClass}>
									{f[id]} <span class="text-z-accent-text">*</span>
								</label>
								<input
									id="poc-{id}"
									name={id}
									{type}
									{autocomplete}
									required
									aria-invalid={errors[id] ? 'true' : undefined}
									aria-describedby={errors[id] ? `poc-${id}-error` : undefined}
									class={cn(inputClass, errors[id] && 'border-z-accent')}
								/>
								{#if errors[id]}
									<p id="poc-{id}-error" class="text-z-accent-text mt-1 text-[13px]">
										{errors[id]}
									</p>
								{/if}
							</div>
						{/each}
					</div>

					<div class="grid gap-5 md:grid-cols-2 md:gap-4">
						<div>
							<label for="poc-company" class={labelClass}>
								{f.company} <span class="text-z-accent-text">*</span>
							</label>
							<input
								id="poc-company"
								name="company"
								type="text"
								autocomplete="organization"
								required
								aria-invalid={errors.company ? 'true' : undefined}
								aria-describedby={errors.company ? 'poc-company-error' : undefined}
								class={cn(inputClass, errors.company && 'border-z-accent')}
							/>
							{#if errors.company}
								<p id="poc-company-error" class="text-z-accent-text mt-1 text-[13px]">
									{errors.company}
								</p>
							{/if}
						</div>
						<div>
							<label for="poc-job-title" class={labelClass}>{f.jobTitle}</label>
							<input
								id="poc-job-title"
								name="job-title"
								type="text"
								autocomplete="organization-title"
								class={inputClass}
							/>
						</div>
					</div>

					<fieldset>
						<legend class={labelClass}>{f.siteType}</legend>
						<div class="grid grid-cols-2 gap-x-4 md:flex md:flex-wrap md:gap-x-5">
							{#each SITE_TYPES as value (value)}
								<label class="flex min-h-11 cursor-pointer items-center gap-2 text-[15px]">
									<input
										type="checkbox"
										name="site-type[]"
										{value}
										class="border-z-border-strong text-z-accent size-5 rounded"
									/>
									{f.siteTypes[value]}
								</label>
							{/each}
						</div>
					</fieldset>

					<div class="grid gap-5 md:grid-cols-2 md:gap-4">
						<div>
							<label for="poc-headcount" class={labelClass}>{f.headcount}</label>
							<select id="poc-headcount" name="headcount" class={inputClass}>
								{#each HEADCOUNTS as [value, key] (key)}
									<option {value}>{f.headcountOptions[key]}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="poc-source" class={labelClass}>{f.source}</label>
							<select id="poc-source" name="hear-about-us" class={inputClass}>
								<option value="">{contact.hearAboutUs.placeholder}</option>
								<option value="ceatec-2026">{f.sourceCeatec}</option>
								{#each SOURCES as value (value)}
									<option {value}>{contact.hearAboutUs.options[SOURCE_LABELS[value]]}</option>
								{/each}
							</select>
						</div>
					</div>

					<div>
						<label for="poc-message" class={labelClass}>{f.message}</label>
						<textarea
							id="poc-message"
							name="message"
							rows="4"
							class="border-z-border-strong bg-z-bg text-z-text focus-visible:outline-z-accent w-full rounded-md border px-3 py-2 text-[16px] focus-visible:outline-2 focus-visible:outline-offset-1"
						></textarea>
					</div>

					<p class="text-z-text-caption text-[13px]">
						<span class="text-z-accent-text">*</span>
						{f.required}
					</p>

					{#if sendFailed}
						<p class="text-z-accent-text text-[14px]" role="alert">{f.sendError}</p>
					{/if}

					<button
						type="submit"
						class="z-btn z-btn-primary min-h-[52px] w-full text-[16px] disabled:opacity-60 lg:min-h-12"
						disabled={sending}
					>
						{sending ? f.sending : f.submit}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>
