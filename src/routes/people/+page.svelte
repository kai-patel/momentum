<script lang="ts">
	import Sidebar from '../../lib/Sidebar.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	import {
		createSvelteTable,
		type TableOptions,
		type ColumnDef,
		getCoreRowModel,
		flexRender
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	const columns: ColumnDef<(typeof data.data.people)[0]>[] = [
		{
			header: 'First Name',
			accessorKey: 'firstName',
			id: 'firstName'
		},
		{
			header: 'Surname',
			accessorKey: 'surname',
			id: 'surname'
		}
	];

	const options = writable<TableOptions<(typeof data.data.people)[0]>>({
		data: data.data.people,
		columns: columns,
		getCoreRowModel: getCoreRowModel()
	});

	const table = createSvelteTable(options);
</script>

<body>
	<Sidebar />
	<div class="p-0 sm:ml-64 h-screen bg-slate-100">
		<h1 class="pt-2 px-4 text-2xl font-bold">People</h1>
		<div class="flex p-4 w-full h-fit">
			<table class="w-full rounded shadow-md table-auto border-collapse bg-white">
				<thead>
					{#each $table.getHeaderGroups() as headerGroup}
						<tr class="border-b">
							{#each headerGroup.headers as header}
								<th class="text-left px-4 py-2 font-semibold text-lg" colSpan={header.colSpan}>
									{#if !header.isPlaceholder}
										<svelte:component
											this={flexRender(header.column.columnDef.header, header.getContext())}
										/>
									{/if}
								</th>
							{/each}
						</tr>
					{/each}
				</thead>
				<tbody>
					{#each $table.getRowModel().rows as row, i}
						<tr
							class="cursor-default border-t hover:bg-gray-50"
							on:click={() => goto(`/person/${data.data.people[i].id}`)}
						>
							{#each row.getVisibleCells() as cell}
								<td class="py-2 px-4">
									<svelte:component
										this={flexRender(cell.column.columnDef.cell, cell.getContext())}
									/>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
				<tfoot>
					{#each $table.getFooterGroups() as footerGroup}
						<tr>
							{#each footerGroup.headers as header}
								<th colSpan={header.colSpan}>
									{#if !header.isPlaceholder}
										<svelte:component
											this={flexRender(header.column.columnDef.footer, header.getContext())}
										/>
									{/if}
								</th>
							{/each}
						</tr>
					{/each}
				</tfoot>
			</table>
		</div>
		<form method="POST" action="?/addPerson">
			<div class="flex px-4 w-full justify-evenly items-center">
				<span class="flex gap-4 items-center">
					<label class="font-semibold" for="firstName">First Name</label>
					<input
						autocomplete="off"
						class="rounded shadow px-1 py-[0.25rem]"
						id="firstName"
						name="firstName"
						type="text"
					/>
					<label class="font-semibold" for="firstName">Surname</label>
					<input
						autocomplete="off"
						class="rounded shadow px-1 py-[0.25rem]"
						id="surname"
						name="surname"
						type="text"
					/>
				</span>
				<button
					class="text-white font-semibold bg-zinc-600 hover:bg-zinc-700 shadow-md rounded px-4 py-2"
					type="submit">Add New Person</button
				>
			</div>
		</form>
	</div>
</body>
