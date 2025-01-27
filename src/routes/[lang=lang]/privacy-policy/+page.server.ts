import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const lang = params.lang;

  if (lang !== 'en' && lang !== 'ja') {
    throw error(404, 'Unsupported language');
  }

  return {
    lang
  };
};