<script lang="ts">
	import { theme } from '$lib/stores/theme';
</script>

<picture>
	{#if $theme === 'dark'}
		<source
			srcset="/images/kana-logo-white-400.webp 2x, /images/kana-logo-white.webp 1x"
			type="image/webp"
		/>
		<img
			src="/images/kana-logo-white.png"
			alt="Zeteoh"
			class="h-8 w-auto"
			height="32"
			width="100"
			loading="eager"
			decoding="async"
		/>
	{:else}
		<source
			srcset="/images/kana-logo-bl-400.webp 2x, /images/kana-logo-bl.webp 1x"
			type="image/webp"
		/>
		<img
			src="/images/kana-logo-bl.png"
			alt="Zeteoh"
			class="h-8 w-auto"
			height="32"
			width="100"
			loading="eager"
			decoding="async"
		/>
	{/if}
</picture>
