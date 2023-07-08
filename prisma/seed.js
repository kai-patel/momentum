import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = [
	{
		firstName: 'Charles',
		surname: 'Barkley',
		dateOfBirth: new Date(1963, 2, 20),
		days: {
			create: [
				{
					dayStart: new Date(2023, 7, 3, 8, 0),
					lunchStart: new Date(2023, 7, 3, 13, 0),
					lunchEnd: new Date(2023, 7, 3, 14, 0),
					dayEnd: new Date(2023, 7, 3, 17, 15),
					day: 3,
					month: 6,
					year: 2023
				}
			]
		}
	}
];

async function main() {
	console.log('Started seeding...');

	for (const person of data) {
		const created = await prisma.person.create({
			data: person
		});
		console.log(`Created ${created.firstName} ${created.surname}`);
	}

	console.log('Finished seeding');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
