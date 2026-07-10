<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { trackEvent } from '$lib/analytics';
	import type { SolutionFinderTranslation } from '$lib/i18n/types';
	import type { Answers, Lang } from '$lib/data/solution-finder/types';
	import type { Utm } from './attribution';

	interface Props {
		t: SolutionFinderTranslation;
		lang: Lang;
		answers: Answers;
		utm: Utm;
		recommendedTech: string;
		/** Called once the report should be revealed. `delivered` is false when
		 * the lead/email round-trip failed (the report still shows). */
		onunlock: (delivered: boolean) => void;
	}
	let { t, lang, answers, utm, recommendedTech, onunlock }: Props = $props();

	const FREE_MAIL = new Set([
		'gmail.com',
		'yahoo.co.jp',
		'yahoo.com',
		'icloud.com',
		'outlook.com',
		'hotmail.com',
		'live.com',
		'aol.com',
		'docomo.ne.jp',
		'au.com',
		'ezweb.ne.jp',
		'softbank.ne.jp'
	]);

	let email = $state('');
	let name = $state('');
	let phone = $state('');
	let company = $state('');
	let consent = $state(false);
	let newsletter = $state(false);

	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorMsg = $state('');

	const domain = $derived(email.includes('@') ? (email.split('@')[1]?.toLowerCase() ?? '') : '');
	const isFreeMail = $derived(domain !== '' && FREE_MAIL.has(domain));
	const emailValid = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		errorMsg = '';

		if (!emailValid) {
			errorMsg = t.gate.invalidEmail;
			return;
		}
		if (!name.trim() || !consent || (isFreeMail && !company.trim())) {
			errorMsg = t.gate.requiredField;
			return;
		}

		status = 'submitting';
		try {
			const res = await fetch('/api/solution-finder', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					lead: { email, name, phone, company, consent, newsletter },
					answers,
					utm,
					lang
				})
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			status = 'success';
			trackEvent('Report: Unlocked', { tech: recommendedTech });
			onunlock(true);
		} catch (err) {
			// Never lose the verdict: unlock the on-screen report anyway, but let
			// the page surface a non-blocking "delivery failed" notice.
			console.error('Solution Finder submit failed:', err);
			status = 'error';
			errorMsg = t.gate.error;
			trackEvent('Report: Unlocked', { tech: recommendedTech, delivery: 'failed' });
			onunlock(false);
		}
	}
</script>

<div class="border-input bg-card rounded-xl border p-6 shadow-sm">
	<h3 class="text-xl font-bold">{t.gate.title}</h3>
	<p class="text-muted-foreground mt-1 text-sm">{t.gate.subtitle}</p>

	<form class="mt-5 space-y-4" onsubmit={submit} novalidate>
		<div class="space-y-1.5">
			<label for="sf-email" class="text-sm font-medium">
				{t.gate.email} <span class="text-destructive">*</span>
			</label>
			<Input id="sf-email" type="email" bind:value={email} autocomplete="email" required />
		</div>

		<div class="space-y-1.5">
			<label for="sf-name" class="text-sm font-medium">
				{t.gate.name} <span class="text-destructive">*</span>
			</label>
			<Input id="sf-name" type="text" bind:value={name} autocomplete="name" required />
		</div>

		{#if isFreeMail}
			<div class="space-y-1.5">
				<label for="sf-company" class="text-sm font-medium">
					{t.gate.company} <span class="text-destructive">*</span>
				</label>
				<Input id="sf-company" type="text" bind:value={company} autocomplete="organization" />
				<p class="text-muted-foreground text-xs">{t.gate.companyFreemailHint}</p>
			</div>
		{/if}

		<div class="space-y-1.5">
			<label for="sf-phone" class="text-sm font-medium">{t.gate.phone}</label>
			<Input id="sf-phone" type="tel" bind:value={phone} autocomplete="tel" />
		</div>

		<label class="flex items-start gap-2 text-sm">
			<input type="checkbox" bind:checked={consent} class="mt-1 size-4" required />
			<span>{t.gate.consent} <span class="text-destructive">*</span></span>
		</label>
		<label class="flex items-start gap-2 text-sm">
			<input type="checkbox" bind:checked={newsletter} class="mt-1 size-4" />
			<span>{t.gate.newsletter}</span>
		</label>

		{#if errorMsg}
			<p class="text-destructive text-sm" role="alert">{errorMsg}</p>
		{/if}
		{#if status === 'success'}
			<p class="text-sm" role="status">{t.gate.success}</p>
		{/if}

		<Button type="submit" class="w-full" disabled={status === 'submitting'}>
			{status === 'submitting' ? t.gate.submitting : t.gate.submit}
		</Button>
	</form>
</div>
