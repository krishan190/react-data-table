export function makeProductData(count = 57) {
	const rows = [];
	for (let i = 1; i <= count; i++) {
		rows.push({
			id: i,
			name: `Product ${i}`,
			category: ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'][i % 5],
			price: parseFloat((10 + (i % 50) * 3.25).toFixed(2)),
			stock: (i * 7) % 120,
			rating: ((i % 50) / 10).toFixed(1),
			sku: `SKU-${String(i).padStart(4, '0')}`,
			supplier: ['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Hooli'][i % 5],
			addedOn: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
		});
	}
	return rows;
}

export const makeProductColumns = () => [
	{ id: 'id', header: 'ID', accessorFn: (row) => row.id, enableHiding: false, filterFn: 'includesString' },
	{ id: 'name', header: 'Name', accessorFn: (row) => row.name, enableHiding: false, filterFn: 'includesString' },
	{ id: 'category', header: 'Category', accessorFn: (row) => row.category, filterFn: 'includesString' },
	{ id: 'price', header: 'Price', accessorFn: (row) => row.price, filterFn: 'equalsString', cell: (info) => `$${info.getValue()}` },
	{ id: 'stock', header: 'Stock', accessorFn: (row) => row.stock, filterFn: 'equalsString' },
	{ id: 'rating', header: 'Rating', accessorFn: (row) => row.rating, filterFn: 'includesString' },
	{ id: 'sku', header: 'SKU', accessorFn: (row) => row.sku, filterFn: 'includesString' },
	{ id: 'supplier', header: 'Supplier', accessorFn: (row) => row.supplier, filterFn: 'includesString' },
	{ id: 'addedOn', header: 'Added On', accessorFn: (row) => row.addedOn, filterFn: 'includesString' },
];