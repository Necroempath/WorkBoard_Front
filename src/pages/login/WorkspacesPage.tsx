import { WorkspaceGrid } from "../../features/workspaces/ui/WorkspaceGrid"
import { useWorkspaces } from "../../features/workspaces/workspace.hooks"

export function WorkspacesPage() {
  const { data, loading } = useWorkspaces()

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Workspaces</h1>

      <WorkspaceGrid workspaces={data} />
    </div>
  )
}