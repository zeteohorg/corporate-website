import { writable } from 'svelte/store';

/** Whether the mobile menu is open; the sticky CTA bar hides while it is. */
export const mobileMenuOpen = writable(false);
