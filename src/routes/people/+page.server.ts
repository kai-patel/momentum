import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import moment from 'moment';

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
		const formData = await event.request.formData();
		const body = [...formData];

		console.log(body);

		const dob = moment(body[2][1].toString(), 'YYYY-MM-DD', true).toDate();

		const createPerson = await prisma.person.create({
			data: {
				firstName: body[0][1].toString(),
				surname: body[1][1].toString(),
				dateOfBirth: dob
			}
		});

		console.log('CREATED PERSON ----', createPerson);
	}

    // TODO Remove person
} satisfies Actions;
