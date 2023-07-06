import { getDaysWorked } from '$lib/mockdb';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const data = getDaysWorked(parseInt(params.id, 10));

	return {
		data
	};
}) satisfies PageLoad;
