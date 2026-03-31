import { useState } from 'react'
import type { Column as ColumnType } from '../../../entities/project'
import { IssueCard } from './IssueCard'
import { useDroppable } from '@dnd-kit/core'
import { CreateIssueModal } from './CreateIssueModal'
import { IconButton } from '../../../shared/ui/IconButton'

export const Column = ({ column }: { column: ColumnType }) => {
  const { setNodeRef } = useDroppable({ id: column.id })

  const [openIssueModal, setOpenIssueModal] = useState(false)
  
  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 rounded-xl p-4 w-72 hrink-0 shadow-sm"
    >
      <div className="flex justify-between items-center mb-3">
        <h2>{column.name}</h2>

          <IconButton
            variant="gray"
            onClick={() => setOpenIssueModal(true)}
          />
      </div>

      <div className="space-y-2 min-h-12.5">
        {column.issues?.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>

      {openIssueModal && (
        <CreateIssueModal
          columnId={column.id}
          onClose={() => setOpenIssueModal(false)}
        />
      )}
    </div>
  )
}