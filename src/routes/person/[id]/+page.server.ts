import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// const data = getDaysWorked(parseInt(params.id, 10));

	const days = await prisma.day.findMany({
		where: {
			personId: params.id
		}
	});

	const name = await prisma.person.findFirstOrThrow({
		where: {
			id: params.id
		},
		select: {
			firstName: true,
			surname: true
		}
	});

	return {
		name,
		days
	};
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
	}
} satisfies Actions;
