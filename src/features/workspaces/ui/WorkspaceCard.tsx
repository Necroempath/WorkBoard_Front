import { useNavigate } from "react-router-dom"
import type { Workspace } from "../../../entities/workspace"

export function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/projects/${workspace.id}`)}
      className="bg-white rounded-xl shadow p-4 cursor-pointer hover:bg-gray-50 transition"
    >
      <h2 className="font-semibold text-lg">{workspace.name}</h2>
    </div>
  )
}