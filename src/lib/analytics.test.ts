import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackClick, trackEvent } from './analytics';

afterEach(() => {
	// @ts-expect-error - reset the synthetic window between tests
	delete globalThis.window;
});

describe('trackEvent', () => {
	it('is a no-op during SSR (no window)', () => {
		expect(() => trackEvent('Whatever')).not.toThrow();
	});

	it('forwards the event name with props wrapped in an options object', () => {
		const plausible = vi.fn();
		// @ts-expect-error - minimal synthetic window
		globalThis.window = { plausible };

		trackEvent('Contact Form: Submit', { inquiry_type: 'demo' });

		expect(plausible).toHaveBeenCalledWith('Contact Form: Submit', {
			props: { inquiry_type: 'demo' }
		});
	});

	it('omits the options object when no props are given', () => {
		const plausible = vi.fn();
		// @ts-expect-error - minimal synthetic window
		globalThis.window = { plausible };

		trackEvent('404');

		expect(plausible).toHaveBeenCalledWith('404', undefined);
	});

	it('does not throw when the plausible stub is missing', () => {
		// @ts-expect-error - window present but plausible not yet defined
		globalThis.window = {};
		expect(() => trackEvent('404')).not.toThrow();
	});
});

describe('trackClick action', () => {
	it('fires an event on click and stops after destroy', () => {
		const plausible = vi.fn();
		// @ts-expect-error - minimal synthetic window
		globalThis.window = { plausible };

		const listeners: Array<() => void> = [];
		const node = {
			addEventListener: (_type: string, handler: () => void) => listeners.push(handler),
			removeEventListener: (_type: string, handler: () => void) => {
				const i = listeners.indexOf(handler);
				if (i !== -1) listeners.splice(i, 1);
			}
		} as unknown as HTMLElement;

		const action = trackClick(node, { name: 'CTA: Request Pilot', props: { location: 'hero' } });
		listeners.forEach((h) => h());

		expect(plausible).toHaveBeenCalledWith('CTA: Request Pilot', {
			props: { location: 'hero' }
		});

		action?.destroy?.();
		expect(listeners).toHaveLength(0);
	});

	it('uses the latest params after update', () => {
		const plausible = vi.fn();
		// @ts-expect-error - minimal synthetic window
		globalThis.window = { plausible };

		const listeners: Array<() => void> = [];
		const node = {
			addEventListener: (_type: string, handler: () => void) => listeners.push(handler),
			removeEventListener: () => {}
		} as unknown as HTMLElement;

		const action = trackClick(node, { name: 'CTA: Learn More' });
		action?.update?.({ name: 'CTA: Renamed' });
		listeners.forEach((h) => h());

		expect(plausible).toHaveBeenCalledWith('CTA: Renamed', undefined);
	});
});
