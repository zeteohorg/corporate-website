<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { Twitter, Github, Linkedin } from 'lucide-svelte';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].common.footer);
</script>

<footer class="border-t">
	<div class="container mx-auto px-4 py-12">
		<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
			<div class="space-y-4">
				<h2 class="text-sm font-medium">{t.company}</h2>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li>
						<a href="/{currentLanguage}/company" class="hover:text-foreground">{t.links.about}</a>
					</li>
					<li>
						<a href="/{currentLanguage}/#contact" class="hover:text-foreground">{t.links.contact}</a
						>
					</li>
				</ul>
			</div>

			<div class="space-y-4">
				<h2 class="text-sm font-medium">{t.resources}</h2>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li>
						<a href="/{currentLanguage}/blog" class="hover:text-foreground">{t.links.blog}</a>
					</li>
					<li>
						<a href="/{currentLanguage}/news" class="hover:text-foreground">{t.links.news}</a>
					</li>
				</ul>
			</div>

			<div class="space-y-4">
				<h2 class="text-sm font-medium">{t.legal}</h2>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li>
						<a href="/privacy-policy" class="hover:text-foreground">{t.links.privacyPolicy}</a>
					</li>
					<li>
						<a href="/terms" class="hover:text-foreground">{t.links.terms}</a>
					</li>
				</ul>
			</div>

			<div class="space-y-4">
				<h2 class="text-sm font-medium">{t.social}</h2>
				<ul class="flex space-x-4 text-muted-foreground">
					<li>
						<a
							href="https://twitter.com/yourcompany"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-foreground"
							aria-label="Twitter"
						>
							<Twitter class="h-5 w-5" />
						</a>
					</li>
					<li>
						<a
							href="https://github.com/yourcompany"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-foreground"
							aria-label="GitHub"
						>
							<Github class="h-5 w-5" />
						</a>
					</li>
					<li>
						<a
							href="https://linkedin.com/company/yourcompany"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-foreground"
							aria-label="LinkedIn"
						>
							<Linkedin class="h-5 w-5" />
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-12 border-t pt-8">
			<p class="text-center text-sm text-muted-foreground">{t.copyright}</p>
		</div>
	</div>
</footer>
