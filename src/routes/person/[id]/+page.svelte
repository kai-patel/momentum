<script lang="ts">
	import { onMount } from 'svelte';
	import moment from 'moment';

	import type { PageServerData } from './$types';
	import type { DayWorked } from '$lib/mockdb';
	import Sidebar from '$lib/Sidebar.svelte';
	import { addWeek, getCurrentWeek, subtractWeek } from '$lib/time';
	export let data: PageServerData;

	let days: Array<moment.Moment> = [];

	let daysInput: Array<DayWorked> = [];

	onMount(() => {
		days = getCurrentWeek();

		for (let i = 0; i < 7; i++) {
			daysInput[i] = {
				started: days[i].hours(0).seconds(0).toDate(),
				lunchStart: days[i].hours(0).seconds(0).toDate(),
				lunchEnd: days[i].hours(0).seconds(0).toDate(),
				ended: days[i].hours(0).seconds(0).toDate(),
				dayOfYear: days[i].dayOfYear()
			};
		}

		for (let i = 0; i < daysInput.length; i++) {
			for (let j = 0; j < data.data.data.length; j++) {
				if (moment(data.data.data[j].started).dayOfYear() === daysInput[i].dayOfYear) {
					daysInput[i] = data.data.data[j];
				}
			}
		}

		days = days;
		daysInput = daysInput;
	});

	function updateDaysWorked() {
		for (let i = 0; i < 7; i++) {
			let day = days[i];
			daysInput[i] = {
				started: day.hours(0).seconds(0).toDate(),
				lunchStart: day.hours(0).seconds(0).toDate(),
				lunchEnd: day.hours(0).seconds(0).toDate(),
				ended: day.hours(0).seconds(0).toDate(),
				dayOfYear: day.dayOfYear()
			};
		}

		for (let i = 0; i < daysInput.length; i++) {
			for (let j = 0; j < data.data.data.length; j++) {
				if (moment(data.data.data[j].started).dayOfYear() === daysInput[i].dayOfYear) {
					daysInput[i] = data.data.data[j];
				}
			}
		}

		daysInput = daysInput;
	}

	function prevWeek() {
		days = subtractWeek(days);
		updateDaysWorked();
	}

	function nextWeek() {
		days = addWeek(days);
		updateDaysWorked();
	}

	function thisWeek() {
		days = getCurrentWeek();
		updateDaysWorked();
	}

	$: console.table(daysInput);
</script>

<body>
	<Sidebar />
	<div class="p-0 sm:ml-64 h-screen bg-slate-100">
		<h1 class="pt-2 px-4 text-2xl font-bold">{`${data.data.name}`}</h1>
		<div class="flex p-4 w-full h-fit">
			<table class="w-full border-collapse shadow-md table-fixed md:table-auto bg-white">
				<thead>
					<tr class="border-b table-row">
						<th class="border-r bg-slate-500" />
						{#each days as day}
							<th class="px-4 py-2 font-semibold text-lg">
								{day.format('dd DD/MM')}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<tr class="border-t">
						<td class="text-center font-semibold text-xs lg:text-lg">Day Start</td>
						{#each daysInput as day, i}
							<td class="py-2 px-4 text-center border-l border-r hover:shadow-inner">
								<input
									on:input={(e) =>
										(day.started = moment(e.currentTarget.value, ['H:m'])
											.day(days[i].day())
											.toDate())}
									type="time"
									class="w-full h-full"
								/>
							</td>
						{/each}
					</tr>
					<tr class="border-t">
						<td class="text-center font-semibold text-xs lg:text-lg">Lunch Start</td>
						{#each daysInput as day, i}
							<td class="py-2 px-4 text-center border-l border-r hover:shadow-inner">
								<input
									on:input={(e) =>
										(day.lunchStart = moment(e.currentTarget.value, ['H:m'])
											.day(days[i].day())
											.toDate())}
									type="time"
									class="w-full h-full"
								/>
							</td>
						{/each}
					</tr>
					<tr class="border-t">
						<td class="text-center font-semibold text-xs lg:text-lg">Lunch End</td>
						{#each daysInput as day, i}
							<td class="py-2 px-4 text-center border-l border-r hover:shadow-inner">
								<input
									on:input={(e) =>
										(day.lunchEnd = moment(e.currentTarget.value, ['H:m'])
											.day(days[i].day())
											.toDate())}
									type="time"
									class="w-full h-full"
								/>
							</td>
						{/each}
					</tr>
					<tr class="border-t">
						<td class="text-center font-semibold text-xs lg:text-lg">Day End</td>
						{#each daysInput as day, i}
							<td class="py-2 px-4 text-center border-l border-r hover:shadow-inner">
								<input
									on:input={(e) =>
										(day.ended = moment(e.currentTarget.value, ['H:m'])
											.day(days[i].day())
											.toDate())}
									type="time"
									class="w-full h-full"
								/>
							</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>
		<div class="h-fit w-full flex justify-center gap-4">
			<button
				on:click={prevWeek}
				class="bg-blue-400 rounded shadow-lg font-semibold text-lg py-2 px-4"
			>
				Previous Week
			</button>
			<button
				on:click={thisWeek}
				class="bg-green-400 rounded shadow-lg font-semibold text-lg py-2 px-4"
			>
				Current Week
			</button>
			<button
				on:click={nextWeek}
				class="bg-blue-400 rounded shadow-lg font-semibold text-lg py-2 px-4"
			>
				Next Week
			</button>
		</div>
	</div>
</body>
