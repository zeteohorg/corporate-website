<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].common.footer);
	const address = $derived(translations[lang].top.footer.address);

	// Year at build time; the site is rebuilt on every deploy
	const year = new Date().getFullYear();

	type FooterLink = { href: string; label: string; external?: boolean };

	const columns: Array<{ title: string; links: FooterLink[] }> = $derived([
		{ title: t.company, links: [{ href: `/${lang}/company/`, label: t.links.about }] },
		{
			title: t.resources,
			links: [
				{ href: `/${lang}/blog/`, label: t.links.blog },
				{ href: `/${lang}/news/`, label: t.links.news }
			]
		},
		{ title: t.legal, links: [{ href: `/${lang}/privacy-policy/`, label: t.links.privacyPolicy }] },
		{
			title: t.social,
			links: [
				{ href: 'https://x.com/zeteoh_ai', label: 'X', external: true },
				{ href: 'https://jp.linkedin.com/company/zeteoh', label: 'LinkedIn', external: true }
			]
		}
	]);
</script>

<footer class="bg-z-dark text-z-on-dark">
	<div class="z-container py-12 lg:py-14">
		<div class="flex flex-col gap-10 lg:flex-row lg:justify-between">
			<div>
				<img
					src="/images/kana-logo-white.png"
					alt="Zeteoh"
					width="100"
					height="28"
					loading="lazy"
					decoding="async"
					class="h-7 w-auto"
				/>
				<p class="text-z-on-dark-sub mt-4 text-[13px] leading-[1.6]">{address}</p>
			</div>

			<nav aria-label="Footer">
				<ul class="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:gap-x-10">
					{#each columns as column (column.title)}
						<li>
							<h2 class="text-[13px] font-bold">{column.title}</h2>
							<ul class="mt-2">
								{#each column.links as link (link.href)}
									<li>
										<a
											href={link.href}
											target={link.external ? '_blank' : undefined}
											rel={link.external ? 'noopener noreferrer' : undefined}
											class="text-z-on-dark-sub hover:text-z-on-dark inline-flex min-h-11 items-center text-[13px] focus-visible:outline-2 focus-visible:outline-white"
										>
											{link.label}
										</a>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<p class="text-z-on-dark-caption border-z-dark-border mt-10 border-t pt-6 text-[12px]">
			© {year} Zeteoh, Inc. All rights reserved.
		</p>
	</div>
</footer>
