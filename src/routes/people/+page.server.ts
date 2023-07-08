import type { Actions, PageServerLoad } from './$types';
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

export const actions = {
	addPerson: async (event) => {
		console.log(...(await event.request.formData()));
	}
} satisfies Actions;
