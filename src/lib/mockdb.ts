export type Person = {
	first_name: string;
	surname: string;
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

export const getDaysWorked = (id: number): { name: string; data: DayWorked[] } => {
	return {
		name: 'Unimplemented',
		data: data[id]
	};
};
