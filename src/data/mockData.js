export function makeData(count = 100) {
	const rows = [];
	for (let i = 1; i <= count; i++) {
		rows.push({
			id: i,
			name: `User ${i}`,
			email: `user${i}@example.com`,
			role: ['Admin', 'Editor', 'Viewer'][i % 3],
			status: ['Active', 'Pending', 'Suspended'][i % 3],
			age: 20 + (i % 30),
			country: ['USA', 'Canada', 'UK', 'Germany', 'India'][i % 5],
			city: ['New York', 'Toronto', 'London', 'Berlin', 'Mumbai'][i % 5],
			company: ['Acme', 'Globex', 'Umbrella', 'Initech', 'Hooli'][i % 5],
			lastLogin: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
		});
	}
	return rows;
}

// meta: { widthClass: 'w-24 min-w-24', sticky: true|false, showFilter: true|false }
export const makeColumns = () => [
	{
		id: 'id',
		header: 'ID',
		accessorFn: (row) => row.id,
		enableHiding: false,
		filterFn: 'includesString',
		cell: (info) => info.getValue(),
		size: 80,
		minSize: 60,
		meta: { widthClass: 'w-24 min-w-24', sticky: true, showFilter: true },
	},
	{
		id: 'name',
		header: 'Name',
		accessorFn: (row) => row.name,
		enableHiding: false,
		filterFn: 'includesString',
		cell: (info) => info.getValue(),
		size: 200,
		meta: { widthClass: 'w-56 min-w-56', sticky: true, showFilter: true },
	},
	{ id: 'email', header: 'Email', accessorFn: (row) => row.email, filterFn: 'includesString', meta: { widthClass: 'min-w-[16rem]', sticky: false, showFilter: true } },
	{ id: 'role', header: 'Role', accessorFn: (row) => row.role, filterFn: 'includesString', meta: { widthClass: 'min-w-[10rem]', sticky: false, showFilter: true } },
	{ id: 'status', header: 'Status', accessorFn: (row) => row.status, filterFn: 'includesString', meta: { widthClass: 'min-w-[10rem]', sticky: false, showFilter: true } },
	{ id: 'age', header: 'Age', accessorFn: (row) => row.age, filterFn: 'equalsString', meta: { widthClass: 'w-24 min-w-24', sticky: false, showFilter: false } },
	{ id: 'country', header: 'Country', accessorFn: (row) => row.country, filterFn: 'includesString', meta: { widthClass: 'min-w-[12rem]', sticky: false, showFilter: true } },
	{ id: 'city', header: 'City', accessorFn: (row) => row.city, filterFn: 'includesString', meta: { widthClass: 'min-w-[12rem]', sticky: false, showFilter: true } },
	{ id: 'company', header: 'Company', accessorFn: (row) => row.company, filterFn: 'includesString', meta: { widthClass: 'min-w-[12rem]', sticky: false, showFilter: true } },
	{ id: 'lastLogin', header: 'Last Login', accessorFn: (row) => row.lastLogin, filterFn: 'includesString', meta: { widthClass: 'min-w-[12rem]', sticky: false, showFilter: false } },
];
