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
}

const Table = <T,>(props: TableProps<T>) => {
  return (
    <div
      className={twMerge(
        'max-h-[calc(100vh - 100px)] min-h-[70vh]  max-w-[calc(100vw - 32px)] bg-white px-2 rounded-b-xl pb-2 overflow-y-auto overflow-x-auto print:p-0 print:rounded-none',
        props.rootClassName
      )}
    >
      <table className="border-spacing-y-2 border-separate w-full print:border-spacing-0">
        <thead className="rounded-md divide-y-8 divide-white print:divide-y-0 print:rounded-none">
          <tr className={twMerge('bg-[#1C9FF6] w-full', props.rowClassName)}>
            {props.columns.map((column, columnIndex) => (
              <th
                scope="col"
                key={columnIndex}
                className={twMerge(
                  'p-4 text-white text-sm font-semibold print:p-0',
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
                      'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 print:py-1 print:px-2 print:text-black',
                      columnIndex === 0 && 'rounded-l-md',
                      columnIndex === props.columns.length - 1 &&
                        'rounded-r-md print:rounded-none',
                      column.className
                    )}
                  >
                    <div className="flex flex-col items-center justify-center">
                      {column.render
                        ? column.render(row, props.data, rowIndex)
                        : (row[column?.key as keyof T] as React.ReactNode)}
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
