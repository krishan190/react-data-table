import React, { useState, useMemo } from 'react';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FunnelIcon, ArrowUpIcon, ArrowDownIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { GlobalFilter } from './components/GlobalFilter';
import ColumnFilter from './components/ColumnFilter';
import { Pagination } from './components/Pagination';
import { ColumnVisibilityModal } from './components/ColumnVisibilityModal';

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

export default function DataTable({
	columns,
	data,
	initialState,
	defaultColWidth = 'min-w-[10rem]',
	pageSizeOptions = [5, 10, 20, 50, 100],
	maxPageButtons = 7,
}) {
	const [globalFilter, setGlobalFilter] = useState('');
	const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

	const table = useReactTable({
		data,
		columns,
		state: { globalFilter },
		initialState: { ...initialState },
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		columnResizeMode: 'onChange',
		defaultColumn: { minSize: 80, size: 150 },
		autoResetPageIndex: false,
	});

	const headerGroups = table.getHeaderGroups();

	return (
		<div className="w-full">
			<div className="mb-3 flex items-center justify-between gap-2">
				<GlobalFilter value={globalFilter} onChange={setGlobalFilter} />
				<button onClick={() => setIsColumnModalOpen(true)} className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none">
					<FunnelIcon className="h-5 w-5" />
					<span>Filter Columns</span>
				</button>
			</div>

			<div className="relative overflow-auto rounded-lg border border-gray-200">
				<table className="w-full border-separate border-spacing-0">
					<thead className="sticky top-0 z-10 bg-white">
						{headerGroups.map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const meta = header.column.columnDef.meta || {};
									const isSticky = !!meta.sticky;
									const stickyClass = isSticky ? (header.index === 0 ? 'left-0' : header.index === 1 ? 'left-24' : '') : '';
									const widthClass = meta.widthClass || defaultColWidth;
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
											className={classNames('border-b border-gray-200 bg-white p-2 text-left text-sm font-semibold text-gray-700', widthClass, isSticky && 'sticky z-10', stickyClass)}
										>
											{header.isPlaceholder ? null : (
												<button onClick={header.column.getToggleSortingHandler()} className={classNames('group inline-flex items-center', header.column.getCanSort() ? 'cursor-pointer select-none' : 'cursor-default')}>
													{flexRender(header.column.columnDef.header, header.getContext())}
													<SortIndicator column={header.column} />
												</button>
											)}
										</th>
									);
								})}
							</tr>
						))}
						<tr>
							{headerGroups[0]?.headers.map((header) => {
								const meta = header.column.columnDef.meta || {};
								const isSticky = !!meta.sticky;
								const stickyClass = isSticky ? (header.index === 0 ? 'left-0' : header.index === 1 ? 'left-24' : '') : '';
								const widthClass = meta.widthClass || defaultColWidth;
								return (
									<th key={`filter-${header.id}`} className={classNames('border-b border-gray-200 bg-white p-2 text-left text-xs font-normal text-gray-700', widthClass, isSticky && 'sticky z-10', stickyClass)}>
										{meta.showFilter && header.column.getCanFilter() ? <ColumnFilter column={header.column} /> : null}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="odd:bg-white even:bg-gray-50">
								{row.getVisibleCells().map((cell) => {
									const meta = cell.column.columnDef.meta || {};
									const isSticky = !!meta.sticky;
									const stickyClass = isSticky ? (cell.column.getIndex() === 0 ? 'left-0' : cell.column.getIndex() === 1 ? 'left-24' : '') : '';
									const widthClass = meta.widthClass || defaultColWidth;
									return (
										<td key={cell.id} className={classNames('whitespace-nowrap border-b border-gray-100 p-2 text-sm text-gray-700', widthClass, isSticky && 'sticky bg-white', stickyClass)}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Swap layout: left = rows per page, right = numbered pages */}
			<div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-2 text-sm">
					<label htmlFor="page-size" className="text-gray-600">Rows per page</label>
					<select
						id="page-size"
						value={table.getState().pagination.pageSize}
						onChange={(e) => table.setPageSize(Number(e.target.value))}
						className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						{pageSizeOptions.map((size) => (
							<option key={size} value={size}>{size}</option>
						))}
					</select>
				</div>
				<div>
					<Pagination table={table} pageSizeOptions={pageSizeOptions} maxPageButtons={maxPageButtons} />
				</div>
			</div>

			{/* <ColumnVisibilityModal open={isColumnModalOpen} onClose={() => setIsColumnModalOpen(false)} table={table} /> */}
		</div>
	);
}
