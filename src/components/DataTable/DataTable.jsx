import React, { useState } from 'react';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FunnelIcon, ArrowUpIcon, ArrowDownIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { GlobalFilter } from './components/GlobalFilter.jsx';
import { ColumnFilter } from './components/ColumnFilter.jsx';
import { Pagination } from './components/Pagination.jsx';
import { ColumnVisibilityModal } from './components/ColumnVisibilityModal.jsx';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

function SortIndicator({ column }) {
	const isSorted = column.getIsSorted();
	if (!column.getCanSort()) return null;
	return (
		<span className="ml-1 inline-flex align-middle text-gray-500">
			{isSorted === 'asc' && <ArrowUpIcon className="h-4 w-4" />}
			{isSorted === 'desc' && <ArrowDownIcon className="h-4 w-4" />}
			{!isSorted && <ChevronUpDownIcon className="h-4 w-4" />}
		</span>
	);
}

export default function DataTable({ columns, data, initialState }) {
	const [globalFilter, setGlobalFilter] = useState('');
	const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
		},
		initialState: {
			...initialState,
		},
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		columnResizeMode: 'onChange',
		defaultColumn: {
			minSize: 80,
			size: 150,
		},
		autoResetPageIndex: false,
	});

	return (
		<div className="w-full">
			{/* Top bar: global search + column visibility */}
			<div className="mb-3 flex items-center justify-between gap-2">
				<GlobalFilter value={globalFilter} onChange={setGlobalFilter} />
				<button
					onClick={() => setIsColumnModalOpen(true)}
					className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none"
				>
					<FunnelIcon className="h-5 w-5" />
					<span>Filter Columns</span>
				</button>
			</div>

			{/* Scroll container */}
			<div className="relative overflow-auto rounded-lg border border-gray-200">
				<table className="w-full border-separate border-spacing-0">
					<thead className="sticky top-0 z-10 bg-white">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header, headerIndex) => {
									const isSticky = headerIndex === 0 || headerIndex === 1;
									const stickyClass = headerIndex === 0 ? 'left-0' : headerIndex === 1 ? 'left-24' : '';
									const widthClass = headerIndex === 0 ? 'min-w-24 w-24' : headerIndex === 1 ? 'min-w-48 w-48' : 'min-w-[10rem]';
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
											className={classNames(
												'border-b border-gray-200 bg-white p-2 text-left text-sm font-semibold text-gray-700',
												widthClass,
												isSticky && 'sticky z-10',
												stickyClass,
											)}
										>
											{header.isPlaceholder ? null : (
												<button
													onClick={header.column.getToggleSortingHandler()}
													className={classNames('group inline-flex items-center', header.column.getCanSort() ? 'cursor-pointer select-none' : 'cursor-default')}
												>
													{flexRender(header.column.columnDef.header, header.getContext())}
													<SortIndicator column={header.column} />
												</button>
											)}
										</th>
									);
								})}
							</tr>
						))}
						{/* Column filters row */}
						<tr>
							{table.getHeaderGroups()[0]?.headers.map((header, headerIndex) => {
								const isSticky = headerIndex === 0 || headerIndex === 1;
								const stickyClass = headerIndex === 0 ? 'left-0' : headerIndex === 1 ? 'left-24' : '';
								const widthClass = headerIndex === 0 ? 'min-w-24 w-24' : headerIndex === 1 ? 'min-w-48 w-48' : 'min-w-[10rem]';
								return (
									<th
										key={`filter-${header.id}`}
										className={classNames(
											'border-b border-gray-200 bg-white p-2 text-left text-xs font-normal text-gray-700',
											widthClass,
											isSticky && 'sticky z-10',
											stickyClass,
										)}
									>
										{header.column.getCanFilter() ? (
											<ColumnFilter column={header.column} />
										) : null}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="odd:bg-white even:bg-gray-50">
								{row.getVisibleCells().map((cell, cellIndex) => {
									const isSticky = cellIndex === 0 || cellIndex === 1;
									const stickyClass = cellIndex === 0 ? 'left-0' : cellIndex === 1 ? 'left-24' : '';
									const widthClass = cellIndex === 0 ? 'min-w-24 w-24' : cellIndex === 1 ? 'min-w-48 w-48' : 'min-w-[10rem]';
									return (
										<td
											key={cell.id}
											className={classNames(
												'whitespace-nowrap border-b border-gray-100 p-2 text-sm text-gray-700',
												widthClass,
												isSticky && 'sticky bg-white',
												stickyClass,
											)}
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Pagination table={table} />
			<ColumnVisibilityModal open={isColumnModalOpen} onClose={() => setIsColumnModalOpen(false)} table={table} />
		</div>
	);
}
