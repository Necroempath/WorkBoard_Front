import type { Issue } from '../../../entities/issue'

export const IssueCard = ({ issue }: { issue: Issue }) => {
  return (
    <div className="bg-white p-2 rounded shadow">
      {issue.title}
    </div>
  )
}