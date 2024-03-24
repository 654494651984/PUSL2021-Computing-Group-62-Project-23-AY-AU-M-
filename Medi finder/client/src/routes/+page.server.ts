import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const searchTerm = event.url.searchParams.get('search');
	const location = event.url.searchParams.get('location');

	return {
		search: searchTerm,
		location
	};
};
