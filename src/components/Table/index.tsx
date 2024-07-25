import { twMerge } from 'tailwind-merge'

export type Column<T> = {
	key: keyof T | Exclude<string, keyof T>
	title: string
	className?: string
	render?: (currentRow: T, allRows: T[], rowIndex: number) => React.ReactNode
}

export type TableProps<T> = {
	title?: string
	columns: Array<Column<T>>
	data: T[]
	rowClassName?: string
	rootClassName?: string
	compact?: boolean
}

const Table = <T,>(props: TableProps<T>) => {
	return (
		<div
			className={twMerge(
				'max-h-[calc(100vh - 100px)] max-w-[calc(100vw - 32px)] min-h-[70vh] overflow-x-auto overflow-y-auto rounded-b-xl bg-white px-2 pb-2 print:rounded-none print:p-0',
				props.rootClassName
			)}
		>
			<table className="w-full border-separate border-spacing-y-2 print:border-spacing-0">
				<thead className="divide-y-8 divide-white rounded-md print:divide-y-0 print:rounded-none">
					<tr className={twMerge('w-full bg-[#1C9FF6]', props.rowClassName)}>
						{props.columns.map((column, columnIndex) => (
							<th
								scope="col"
								key={columnIndex}
								className={twMerge(
									'text-sm font-semibold text-white print:p-0',
									columnIndex === 0 && 'rounded-l-md',
									columnIndex === props.columns.length - 1 && 'rounded-r-md',
									props.compact ? 'p-2' : 'p-4',
									column.className
								)}
							>
								{column.title}
							</th>
						))}
					</tr>
				</thead>

				<tbody className="divide-y-8 divide-white rounded-md print:divide-y-0">
					{props.data &&
						props.data.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								className={twMerge(
									'bg-gray-100 hover:bg-gray-200 print:bg-white',
									props.rowClassName
								)}
							>
								{props.columns.map((column, columnIndex) => (
									<td
										key={`${rowIndex}-${columnIndex}`}
										className={twMerge(
											'whitespace-nowrap text-sm font-medium text-gray-900 print:px-2 print:py-1 print:text-black',
											columnIndex === 0 && 'rounded-l-md',
											columnIndex === props.columns.length - 1 && 'rounded-r-md print:rounded-none',
											props.compact ? 'px-2 py-2' : 'py-4 pl-4 pr-3',
											column.className
										)}
									>
										<div className="flex flex-col items-center justify-center">
											{column.render
												? column.render(row, props.data, rowIndex)
												: ((row[column?.key as keyof T] || '') as React.ReactNode)}
										</div>
									</td>
								))}
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
