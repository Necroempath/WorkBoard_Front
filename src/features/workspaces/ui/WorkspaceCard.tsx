import { useNavigate } from "react-router-dom"
import type { Workspace } from "../../../entities/workspace"

export function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  const roleColor : any = {
    Owner: 'text-purple-600',
    Admin: 'text-blue-600',
    Member: 'text-green-600',
    Viewer: 'text-gray-500',
}
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/workspaces/${workspace.id}/projects`)}
      className="bg-white rounded-xl shadow p-4 cursor-pointer hover:bg-gray-50 transition"
    >
      <h2 className="font-semibold text-lg">{workspace.name}</h2>
      <div className={`text-sm ${roleColor[workspace.role]}`}>
  {workspace.role}
</div>
    </div>
  )
}