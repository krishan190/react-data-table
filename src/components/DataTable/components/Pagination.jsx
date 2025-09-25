import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const PAGE_SIZES = [5, 10, 20, 50, 100];

export function Pagination({ table }) {
	const { pageIndex, pageSize } = table.getState().pagination;
	return (
		<div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex items-center gap-2">
				<button
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className={`inline-flex items-center justify-center rounded-md border px-2 py-1.5 ${
						table.getCanPreviousPage() ? 'border-gray-300 bg-white hover:bg-gray-50' : 'cursor-not-allowed border-gray-200 text-gray-400'
					}`}
				>
					<ChevronLeftIcon className="h-5 w-5" />
				</button>
				<button
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className={`inline-flex items-center justify-center rounded-md border px-2 py-1.5 ${
						table.getCanNextPage() ? 'border-gray-300 bg-white hover:bg-gray-50' : 'cursor-not-allowed border-gray-200 text-gray-400'
					}`}
				>
					<ChevronRightIcon className="h-5 w-5" />
				</button>
				<div className="ml-2 text-sm text-gray-600">
					Page {pageIndex + 1} of {table.getPageCount() || 1}
				</div>
			</div>
			<div className="flex items-center gap-2 text-sm">
				<label htmlFor="page-size" className="text-gray-600">Rows per page</label>
				<select
					id="page-size"
					value={pageSize}
					onChange={(e) => table.setPageSize(Number(e.target.value))}
					className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					{PAGE_SIZES.map((size) => (
						<option key={size} value={size}>{size}</option>
					))}
				</select>
			</div>
		</div>
	);
}
