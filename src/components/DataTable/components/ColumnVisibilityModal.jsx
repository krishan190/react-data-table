import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export function ColumnVisibilityModal({ open, onClose, table }) {
	const columns = table.getAllLeafColumns();
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-30" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/30" />
				</Transition.Child>

				<div className="fixed inset-0 z-30 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-4 text-left align-middle shadow-xl transition-all">
								<Dialog.Title className="mb-2 text-lg font-semibold text-gray-900">Columns</Dialog.Title>
								<div className="max-h-80 space-y-1 overflow-auto p-1">
									{columns.map((column) => {
										if (!column.getCanHide()) return null;
										const id = `colvis-modal-${column.id}`;
										return (
											<label key={column.id} htmlFor={id} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-gray-50">
												<input
													id={id}
													type="checkbox"
													checked={column.getIsVisible()}
													onChange={column.getToggleVisibilityHandler()}
													className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
												/>
												<span className="truncate">{column.columnDef.header ?? column.id}</span>
											</label>
										);
									})}
								</div>
								<div className="mt-4 flex justify-end">
									<button onClick={onClose} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50">Close</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}