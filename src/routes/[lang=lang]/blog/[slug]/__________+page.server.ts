import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	// This empty load function tells SvelteKit that the route exists
	// Actual data loading will happen client-side
	return {};
};
