import type { Column as ColumnType } from '../../../entities/project'
import { Column } from './Column'

export const BoardView = ({ columns }: { columns: ColumnType[] }) => {
  const sorted = [...columns].sort((a, b) => a.order - b.order)

  return (
    <div className="flex gap-4 overflow-x-auto">
      {sorted.map((col) => (
        <Column key={col.id} column={col} />
      ))}
    </div>
  )
}