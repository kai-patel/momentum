<script lang="ts">
	import { onMount } from 'svelte';
	import moment from 'moment';

	import type { PageServerData } from './$types';
	import Sidebar from '$lib/Sidebar.svelte';
	import { addWeek, getCurrentWeek, subtractWeek } from '$lib/time';
	export let data: PageServerData;

	let days: moment.Moment[] = [];

	let startedValues: { [key: string]: string } = {};
	let lunchStartedValues: { [key: string]: string } = {};
	let lunchEndedValues: { [key: string]: string } = {};
	let endedValues: { [key: string]: string } = {};

	$: {
	}

	onMount(() => {
		days = getCurrentWeek();

		for (let i = 0; i < data.days.length; i++) {
			const dayData = data.days[i];
			const day = moment(dayData.dayStart).format('YYYY-MM-DD');

			startedValues[day] = moment(dayData.dayStart).format('HH:mm');
			lunchStartedValues[day] = moment(dayData.lunchStart).format('HH:mm');
			lunchEndedValues[day] = moment(dayData.lunchEnd).format('HH:mm');
			endedValues[day] = moment(dayData.dayEnd).format('HH:mm');
		}
	});

	function prevWeek() {
		days = subtractWeek(days);
	}

	function nextWeek() {
		days = addWeek(days);
	}

	function thisWeek() {
		days = getCurrentWeek();
	}
</script>

<body>
	<Sidebar />
	<div class="p-0 sm:ml-64 h-screen bg-slate-100">
		<h1 class="pt-2 px-4 text-2xl font-bold">{`${data.name.firstName} ${data.name.surname}`}</h1>
		<form method="POST" action="?/save">
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
							{#each days as day}
								<td class="py-2 px-4 text-center border-l border-r hover:shadow-inner">
									<input
										bind:value={startedValues[day.format('YYYY-MM-DD')]}
										type="time"
										class="w-full h-full"
										name="dayStart"
									/>
								</td>
							{/each}
						</tr>
						<tr class="border-t">
							<td class="text-center font-semibold text-xs lg:text-lg">Lunch Start</td>
							{#each days as day}
								<td class="py-2 px-4 text-center border-l border-r hover:shadow-inner">
									<input
										bind:value={lunchStartedValues[day.format('YYYY-MM-DD')]}
										type="time"
										class="w-full h-full"
										name="lunchStart"
									/>
								</td>
							{/each}
						</tr>
						<tr class="border-t">
							<td class="text-center font-semibold text-xs lg:text-lg">Lunch End</td>
							{#each days as day}
								<td class="py-2 px-4 text-center border-l border-r hover:shadow-inner">
									<input
										bind:value={lunchEndedValues[day.format('YYYY-MM-DD')]}
										type="time"
										class="w-full h-full"
										name="lunchEnd"
									/>
								</td>
							{/each}
						</tr>
						<tr class="border-t">
							<td class="text-center font-semibold text-xs lg:text-lg">Day End</td>
							{#each days as day}
								<td class="py-2 px-4 text-center border-l border-r hover:shadow-inner">
									<input
										bind:value={endedValues[day.format('YYYY-MM-DD')]}
										type="time"
										class="w-full h-full"
										name="dayEnd"
									/>
								</td>
							{/each}
						</tr>
					</tbody>
				</table>
			</div>
			<div class="p-2 h-fit w-full flex justify-center gap-4">
				<button
					type="button"
					on:click={prevWeek}
					class="text-white bg-zinc-600 rounded shadow-lg font-semibold text-lg py-2 px-4 hover:bg-zinc-700"
				>
					Previous Week
				</button>
				<button
					type="button"
					on:click={thisWeek}
					class="bg-orange-400 rounded shadow-lg font-semibold text-lg py-2 px-4 hover:bg-orange-500"
				>
					Current Week
				</button>
				<button
					type="button"
					on:click={nextWeek}
					class="text-white bg-zinc-600 rounded shadow-lg font-semibold text-lg py-2 px-4 hover:bg-zinc-700"
				>
					Next Week
				</button>
			</div>
			<div class="p-2 h-fit w-full flex justify-center gap-4">
				<button
					type="submit"
					class="bg-red-400 rounded shadow-lg font-semibold text-lg py-2 px-4 hover:bg-red-500"
					>Save</button
				>
			</div>
		</form>
	</div>
</body>
