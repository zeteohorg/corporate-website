import type { ComponentType } from 'svelte';
import { mount } from 'svelte';

export function mountMDXComponents(
	content: HTMLElement,
	components: Record<string, ComponentType>
) {
	const mdxElements = content.querySelectorAll('[data-mdx]');

	mdxElements.forEach((el) => {
		if (!(el instanceof HTMLElement)) return;

		try {
			const componentName = el.getAttribute('data-mdx');
			if (!componentName || !components[componentName]) return;

			const propsStr = el.getAttribute('data-props') || '{}';
			const contentStr = el.getAttribute('data-content') || '';

			const props = JSON.parse(decodeURIComponent(propsStr));
			const children = decodeURIComponent(contentStr);

			// Create a new container for the component
			const container = document.createElement('div');
			el.parentNode?.replaceChild(container, el);

			// Mount the component in the new container
			mount(components[componentName], {
				target: container,
				props: { ...props, children }
			});
		} catch (error) {
			console.error('Failed to mount MDX component:', error);
		}
	});
}
