import type { PageLoad } from './$types';
import { getPeople } from '../../lib/mockdb';

export const load = (({}) => {
	return {
		data: {
			people: getPeople()
		}
	};
}) satisfies PageLoad;
