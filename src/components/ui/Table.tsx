import { ReactNode } from 'react'

interface Column<T> {
  key: string
  header: string
  render?: (item: T, index: number) => ReactNode
  sortable?: boolean
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  renderRow?: (item: T, index: number) => ReactNode
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  className?: string
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  renderRow,
  onSort,
  sortKey,
  sortDirection,
  className = '',
}: TableProps<T>) {
  const handleSort = (key: string) => {
    if (!onSort) return
    const newDirection =
      sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc'
    onSort(key, newDirection)
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-left text-sm font-semibold text-gray-300 ${
                  column.sortable ? 'cursor-pointer hover:text-white' : ''
                }`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && sortKey === column.key && (
                    <span className="text-primary-400">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderRow
            ? data.map((item, index) => renderRow(item, index))
            : data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-gray-300">
                      {column.render
                        ? column.render(item, index)
                        : String(item[column.key] || '')}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}

