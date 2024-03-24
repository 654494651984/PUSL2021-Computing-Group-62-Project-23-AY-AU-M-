import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const searchTerm = event.url.searchParams.get('search');

	return {
		search: searchTerm
	};
};
