import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load = (async ({}) => {
	const data = await prisma.person.findMany({
		select: {
			firstName: true,
			surname: true,
			id: true
		}
	});

	return {
		data: {
			people: data
		}
	};
}) satisfies PageServerLoad;
