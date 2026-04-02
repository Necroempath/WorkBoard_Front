import type { Issue } from '../../../entities/issue'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export const IssueCard = ({ issue }: { issue: Issue }) => {
const { setNodeRef: setDragRef, listeners, attributes, transform } = useDraggable({
  id: issue.id,
  data: { columnId: issue.columnId }
})

const { setNodeRef: setDropRef } = useDroppable({
  id: issue.id,
  data: { columnId: issue.columnId }
})

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
         ref={(node) => {
    setDragRef(node)
    setDropRef(node)
  }}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-3 rounded shadow cursor-grab"
    >
      {issue.title}
    </div>
  )
}
