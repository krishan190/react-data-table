import React, { useMemo, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export function Pagination({ table, pageSizeOptions = [5, 10, 20, 50, 100], maxPageButtons = 7 }) {
	const { pageIndex, pageSize } = table.getState().pagination;
	const pageCount = table.getPageCount() || 1;

	const setPage = useCallback((idx) => table.setPageIndex(idx), [table]);
	const setPageSize = useCallback((size) => table.setPageSize(size), [table]);

	const pages = useMemo(() => {
		// Build windowed page list with ellipses
		const total = pageCount;
		const current = pageIndex + 1;
		const maxBtns = Math.max(5, maxPageButtons);
		if (total <= maxBtns) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}
		const pagesArr = [];
		const half = Math.floor((maxBtns - 3) / 2);
		const start = Math.max(2, current - half);
		const end = Math.min(total - 1, current + half);
		pagesArr.push(1);
		if (start > 2) pagesArr.push('…');
		for (let p = start; p <= end; p++) pagesArr.push(p);
		if (end < total - 1) pagesArr.push('…');
		pagesArr.push(total);
		return pagesArr;
	}, [pageCount, pageIndex, maxPageButtons]);

	return (
		<div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex items-center gap-1">
			<div className="ml-2 text-sm text-gray-600">
					Page {pageIndex + 1} of {pageCount}
				</div>
				<button
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className={`inline-flex items-center justify-center rounded-md border px-2 py-1.5 ${
						table.getCanPreviousPage() ? 'border-gray-300 bg-white hover:bg-gray-50' : 'cursor-not-allowed border-gray-200 text-gray-400'
					}`}
				>
					<ChevronLeftIcon className="h-5 w-5" />
				</button>
				<div className="flex items-center gap-1">
					{pages.map((p, idx) =>
						p === '…' ? (
							<span key={`ellipsis-${idx}`} className="px-2 text-gray-500">…</span>
						) : (
							<button
								key={p}
								onClick={() => setPage(p - 1)}
								className={`min-w-8 rounded-md border px-2 py-1.5 text-sm ${
									p - 1 === pageIndex
										? 'border-indigo-500 bg-indigo-50 text-indigo-700'
										: 'border-gray-300 bg-white hover:bg-gray-50'
								}`}
							>
								{p}
							</button>
						)
					)}
				</div>
				
				<button
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className={`inline-flex items-center justify-center rounded-md border px-2 py-1.5 ${
						table.getCanNextPage() ? 'border-gray-300 bg-white hover:bg-gray-50' : 'cursor-not-allowed border-gray-200 text-gray-400'
					}`}
				>
					<ChevronRightIcon className="h-5 w-5" />
				</button>
				
			</div>
			{/* <div className="flex items-center gap-2 text-sm">
				<label htmlFor="page-size" className="text-gray-600">Rows per page</label>
				<select
					id="page-size"
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
					className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					{pageSizeOptions.map((size) => (
						<option key={size} value={size}>{size}</option>
					))}
				</select>
			</div> */}
		</div>
	);
}
