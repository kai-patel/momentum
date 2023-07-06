import { getDaysWorked } from '$lib/mockdb';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const data = getDaysWorked(parseInt(params.id, 10));

	return {
		data
	};
}) satisfies PageServerLoad;
