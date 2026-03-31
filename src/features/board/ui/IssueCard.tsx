import type { Issue } from '../../../entities/issue'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export const IssueCard = ({ issue }: { issue: Issue }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: issue.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-3 rounded shadow cursor-grab"
    >
      {issue.title}
    </div>
  )
}