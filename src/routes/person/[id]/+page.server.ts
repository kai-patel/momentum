import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// const data = getDaysWorked(parseInt(params.id, 10));

	const weeks = await prisma.month.findMany({
		where: {
			personId: params.id
		},
		select: {
			weeks: true
		}
	});

	return {
		// data
	};
}) satisfies PageServerLoad;
