import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { lang } = params;

	// Validate language parameter
	if (lang !== 'en' && lang !== 'ja') {
		throw error(404, 'Unsupported language');
	}

	return {
		// Add any server-loaded data here if needed
	};
};
