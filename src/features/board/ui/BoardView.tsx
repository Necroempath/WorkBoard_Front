import { useAppDispatch } from '../../../app/hooks'
import type { Column as ColumnType } from '../../../entities/project'
import { Column } from './Column'
import { moveIssueAsync } from '../board.slice'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'

export const BoardView = ({ columns }: { columns: ColumnType[] }) => {
  const dispatch = useAppDispatch()

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event
  if (!over) return

  const issueId = active.id as string
  const toColumnId = over.id as string

  const fromColumnId = findColumnId(issueId, columns)

  if (!fromColumnId || fromColumnId === toColumnId) return

  console.log('dispatching in view board')
  dispatch(moveIssueAsync({ issueId, fromColumnId, toColumnId }))
}

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((col) => (
          <Column key={col.id} column={col} />
        ))}
      </div>
    </DndContext>
  )
}

const findColumnId = (issueId: string, columns: ColumnType[]) => {
  for (const col of columns) {
    if (col.issues.some(i => i.id === issueId)) {
      return col.id
    }
  }
  return null
}