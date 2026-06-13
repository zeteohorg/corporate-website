import type { Action } from 'svelte/action';

/** Scalar custom properties attached to a Plausible event. */
export type PlausibleProps = Record<string, string | number | boolean>;

interface PlausibleOptions {
	props?: PlausibleProps;
	callback?: () => void;
}

declare global {
	interface Window {
		plausible?: (event: string, options?: PlausibleOptions) => void;
	}
}

/**
 * Send a custom event to Plausible Analytics.
 *
 * Safe to call during SSR — it is a no-op when `window` is unavailable. Events
 * are queued by the stub in `app.html` until the (deferred) tracking script loads.
 *
 * @see https://plausible.io/docs/custom-event-goals
 */
export function trackEvent(name: string, props?: PlausibleProps): void {
	if (typeof window === 'undefined') return;
	window.plausible?.(name, props ? { props } : undefined);
}

/**
 * Svelte action that fires a Plausible custom event when the node is clicked.
 *
 * @example
 * <a href="..." use:trackClick={{ name: 'CTA: Request Pilot', props: { location: 'hero' } }}>
 */
export const trackClick: Action<HTMLElement, { name: string; props?: PlausibleProps }> = (
	node,
	params
) => {
	let current = params;
	const handler = () => trackEvent(current.name, current.props);
	node.addEventListener('click', handler);

	return {
		update(next) {
			current = next;
		},
		destroy() {
			node.removeEventListener('click', handler);
		}
	};
};
