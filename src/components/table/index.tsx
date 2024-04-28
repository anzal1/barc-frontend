import { twMerge } from 'tailwind-merge'

export type TableDefaultDocType = any

export type Column<T> = {
  key: string
  title: string
  className?: string
  render?: (currentRow: T, allRows: T[], rowIndex: number) => React.ReactNode
}

export type TableProps<T> = {
  title: string
  columns: Array<Column<T>>
  data: T[]
  rowClassName?: string
}

const Table = <T = TableDefaultDocType,>(props: TableProps<T>) => {
  return (
    <div className="rounded-xl p-4">
      <div className="rounded-t-xl bg-[#466BCC] p-4 flex items-center justify-between">
        <h1 className="text-white font-semibold text-xl">{props.title}</h1>
        <div>Cross</div>
      </div>

      <div className="max-h-[calc(100vh - 100px)] min-h-[70vh]  max-w-[calc(100vw - 32px)] bg-white px-2 rounded-b-xl pb-2 overflow-y-auto overflow-x-auto">
        <table className="border-spacing-y-2 border-separate">
          <thead className="rounded-md divide-y-8 divide-white">
            <tr className={twMerge('bg-[#466BCC]', props.rowClassName)}>
              {props.columns.map((column, columnIndex) => (
                <th
                  scope="col"
                  key={columnIndex}
                  className={twMerge(
                    'p-4 text-center text-white text-sm font-semibold w-full',
                    columnIndex === 0 && 'rounded-l-md',
                    columnIndex === props.columns.length - 1 && 'rounded-r-md',
                    column.className
                  )}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y-8 divide-white rounded-md">
            {props.data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={twMerge('bg-gray-100', props.rowClassName)}
              >
                {props.columns.map((column, columnIndex) => (
                  <td
                    key={`${rowIndex}-${columnIndex}`}
                    className={twMerge(
                      'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center',
                      columnIndex === 0 && 'rounded-l-md',
                      columnIndex === props.columns.length - 1 &&
                        'rounded-r-md',
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(row, props.data, rowIndex)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
