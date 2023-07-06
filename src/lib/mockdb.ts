export type Person = {
	first_name: string;
	surname: string;
	id: number;
};

export type DayWorked = {
	started: Date;
	lunchStart: Date;
	lunchEnd: Date;
	ended: Date;
	dayOfYear: number;
};

const data: { [key: number]: DayWorked[] } = {
	0: [
		{
			started: new Date(2023, 3, 21, 8, 0),
			lunchStart: new Date(2023, 3, 21, 12, 0),
			lunchEnd: new Date(2023, 3, 21, 13, 0),
			ended: new Date(2023, 3, 21, 17, 0),
			dayOfYear: 80
		}
	],
	1: [
		{
			started: new Date(2023, 3, 21, 8, 30),
			lunchStart: new Date(2023, 3, 21, 12, 5),
			lunchEnd: new Date(2023, 3, 21, 13, 5),
			ended: new Date(2023, 3, 21, 17, 15),
			dayOfYear: 80
		}
	],
	2: [
		{
			started: new Date(2023, 3, 22, 9, 0),
			lunchStart: new Date(2023, 3, 22, 13, 0),
			lunchEnd: new Date(2023, 3, 22, 14, 0),
			ended: new Date(2023, 3, 22, 17, 30),
			dayOfYear: 81
		}
	]
};

const people: Person[] = [
	{
		first_name: 'John',
		surname: 'Smith',
		id: 0
	},
	{
		first_name: 'Alan',
		surname: 'Jones',
		id: 1
	},
	{
		first_name: 'Cameron',
		surname: 'Young',
		id: 2
	}
];

export const getDaysWorked = (id: number): { name: string; data: DayWorked[] } => {
	return {
		name: people.find((person) => person.id === id)?.first_name ?? 'Could not find person',
		data: data[id]
	};
};

export const getPeople = (): Person[] => {
	return people;
};
