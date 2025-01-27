<script lang="ts">
  import type { PrivacyPolicyTranslation } from '$lib/i18n/types';
  import { cn } from '$lib/utils';

  export let t: PrivacyPolicyTranslation;
</script>

<div class="min-h-screen bg-black text-white">
  <div class="container max-w-4xl mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{t.title}</h1>
    
    <div class="prose prose-invert max-w-none">
      <p class="mb-8 text-gray-300">{t.intro}</p>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-white">{t.information.title}</h2>
        <p class="text-gray-300">{t.information.description}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-white">{t.usage.title}</h2>
        <p class="text-gray-300">{t.usage.description}</p>
        <ul class="list-disc pl-6 mt-4 text-gray-300">
          {#each t.usage.purposes as purpose}
            <li>{purpose}</li>
          {/each}
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-white">{t.sharing.title}</h2>
        <p class="text-gray-300">{t.sharing.description}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-white">{t.cookies.title}</h2>
        <p class="text-gray-300">{t.cookies.description}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-white">{t.rights.title}</h2>
        <p class="text-gray-300">{t.rights.description}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-white">{t.updates.title}</h2>
        <p class="text-gray-300">{t.updates.description}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-white">{t.contact.title}</h2>
        <p class="mb-2 text-gray-300">{t.contact.address}</p>
        <p class="text-gray-300">Email: {t.contact.email}</p>
      </section>

      <p class="text-sm text-gray-400 mt-12">{t.lastUpdate}</p>
    </div>
  </div>
</div>