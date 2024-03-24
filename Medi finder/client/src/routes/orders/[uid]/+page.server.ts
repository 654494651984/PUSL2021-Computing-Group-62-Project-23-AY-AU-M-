import type { PageServerLoad } from './$types';
import { getOrders } from '$lib/firebase';

export const load: PageServerLoad = async ({ params }) => {
	const uid = params.uid;

	const orders = await getOrders(uid);

	return {
		orders
	};
};
