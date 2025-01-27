<script lang="ts">
    import PrivacyPolicy from '$lib/components/privacy-policy.svelte';
    import { translations } from '$lib/i18n/translations';
    import type { PageData } from './$types';
  
    export let data: PageData;
    const { lang } = data;
    const t = translations[lang].privacyPolicy;
  </script>
  
  <PrivacyPolicy {t} />