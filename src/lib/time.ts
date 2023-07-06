import moment from 'moment';

export const getCurrentWeek = (): moment.Moment[] => {
	let week = [];

	for (let i = 0; i < 7; i++) {
		let day = moment().startOf('isoWeek').add(i, 'days');
		week.push(day);
	}

	return week;
};

export const subtractWeek = (days: moment.Moment[]): moment.Moment[] => {
	for (let i = 0; i < 7; i++) {
		days[i] = days[i].subtract(7, 'days');
	}

	return days;
};

export const addWeek = (days: moment.Moment[]): moment.Moment[] => {
	for (let i = 0; i < 7; i++) {
		days[i] = days[i].add(7, 'days');
	}

	return days;
};
