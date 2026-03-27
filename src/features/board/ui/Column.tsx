import type { Column as ColumnType } from '../../../entities/project'
import { IssueCard } from './IssueCard'

export const Column = ({ column }: { column: ColumnType }) => {
  return (
    <div className="bg-gray-100 rounded p-3 w-72 shrink-0">
      <h2 className="font-semibold mb-2">{column.name}</h2>

      <div className="space-y-2">
        {column.issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}