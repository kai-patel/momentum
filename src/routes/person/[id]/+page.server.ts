import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';
import chunk from 'lodash/chunk';
import moment from 'moment';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
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
			const date = moment(inputs[0][i][1].toString());
			const day = date.date();
			const month = date.month();
			const year = date.year();

			days.push({
				day,
				month,
				year,
				dayStart: moment(inputs[1][i][1].toString(), 'HH:mm').toDate(),
				lunchStart: moment(inputs[2][i][1].toString(), 'HH:mm').toDate(),
				lunchEnd: moment(inputs[3][i][1].toString(), 'HH:mm').toDate(),
				dayEnd: moment(inputs[4][i][1].toString(), 'HH:mm').toDate()
			});
		}

		const updates = [];
		for (let i = 0; i < 7; i++) {
			const day = days[i];

			if (
				!isNaN(day.dayStart.getDate()) &&
				!isNaN(day.lunchStart.getDate()) &&
				!isNaN(day.lunchEnd.getDate()) &&
				!isNaN(day.dayEnd.getDate())
			) {
				console.log(day);
				const dbDay = prisma.day.upsert({
					where: {
						personId_day_month_year: {
							personId: event.params.id,
							day: day.day,
							month: day.month,
							year: day.year
						}
					},
					create: {
						day: day.day,
						month: day.month,
						year: day.year,
						dayStart: day.dayStart,
						lunchStart: day.lunchStart,
						lunchEnd: day.lunchEnd,
						dayEnd: day.dayEnd,
						person: {
							connect: {
								id: event.params.id
							}
						}
					},
					update: {
						dayStart: day.dayStart,
						lunchStart: day.lunchStart,
						lunchEnd: day.lunchEnd,
						dayEnd: day.dayEnd
					}
				});

				updates.push(dbDay);
			}
		}

		const runUpdates = await prisma.$transaction(updates);

		console.log('UPDATES ----', runUpdates);
	},

	removePerson: async (event) => {
		const removed = prisma.person.delete({
			where: {
				id: event.params.id
			}
		});

		const removedRelation = prisma.day.deleteMany({
			where: {
				personId: event.params.id
			}
		});

		const transaction = await prisma.$transaction([removed, removedRelation]);

		console.log('REMOVED PERSON AND RELATED DAYS ----', transaction);
		return redirect(303, '/people');
	}
} satisfies Actions;
