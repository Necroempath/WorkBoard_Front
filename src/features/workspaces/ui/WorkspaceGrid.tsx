import type { Workspace } from "../../../entities/workspace";
import { CreateWorkspaceCard } from "./CreateWorkspaceCard";
import { WorkspaceCard } from "./WorkspaceCard";

export function WorkspaceGrid({ workspaces }: { workspaces: Workspace[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {workspaces.map((w) => (
        <WorkspaceCard key={w.id} workspace={w} />
      ))}

      <CreateWorkspaceCard />
    </div>
  );
}
