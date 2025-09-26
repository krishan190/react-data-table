import React from 'react';

function ColumnFilterComponent({ column }) {
	if (!column.getCanFilter()) return null;
	const columnFilterValue = column.getFilterValue();
	return (
		<input
			value={columnFilterValue ?? ''}
			onChange={(e) => column.setFilterValue(e.target.value)}
			placeholder={`Filter ${column.id}...`}
			className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
		/>
	);
}

export default React.memo(ColumnFilterComponent);