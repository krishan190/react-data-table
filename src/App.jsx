import React, { useMemo, useState } from 'react';
import './App.css';
import { DataTable } from './components/DataTable';
import { makeColumns, makeData } from './data/mockData';
import { makeProductColumns, makeProductData } from './data/productData';

export default function App() {
	const [showProducts, setShowProducts] = useState(false);

	const userData = useMemo(() => makeData(120), []);
	const userColumns = useMemo(() => makeColumns(), []);

	const productData = useMemo(() => makeProductData(57), []);
	const productColumns = useMemo(() => makeProductColumns(), []);

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-[var(--app-max-w)] px-4 py-8">
				<div className="mb-4 flex items-center justify-between">
					<h1 className="text-2xl font-semibold text-gray-800">Reusable Data Table</h1>
					<button
						onClick={() => setShowProducts((v) => !v)}
						className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
					>
						{showProducts ? 'Hide Product Details' : 'Product Details'}
					</button>
				</div>

				<div className="rounded-lg bg-white p-4 shadow">
					{showProducts ? (
						<DataTable
							data={productData}
							columns={productColumns}
							initialState={{ pagination: { pageIndex: 0, pageSize: 10 } }}
						/>
					) : (
						<DataTable
							data={userData}
							columns={userColumns}
							initialState={{ pagination: { pageIndex: 0, pageSize: 10 } }}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
