import React from 'react';

function GlobalFilterComponent({ value, onChange, placeholder = 'Search all...' }) {
	return (
		<input
			value={value ?? ''}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className="w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
		/>
	);
}

export const GlobalFilter = React.memo(GlobalFilterComponent);