import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';
import chunk from 'lodash/chunk';
import type { Prisma } from '@prisma/client';
import moment from 'moment';

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
	save: async (event) => {
		const formData = await event.request.formData();
		const body = [...formData];
		const inputs = chunk(body, 7);

		const days = [];

		for (let i = 0; i < 7; i++) {
			days.push({
				dayStart: moment(inputs[0][i][1].toString(), 'HH:mm').toDate(),
				lunchStart: moment(inputs[1][i][1].toString(), 'HH:mm').toDate(),
				lunchEnd: moment(inputs[2][i][1].toString(), 'HH:mm').toDate(),
				dayEnd: moment(inputs[3][i][1].toString(), 'HH:mm').toDate()
			});
		}

		console.log(days);
	}
} satisfies Actions;
