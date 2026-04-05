import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchProjects } from '../../features/projects/projects.slice'
import { ProjectCard } from '../../features/projects/ui/ProjectCard'
import { CreateProjectCard } from '../../features/projects/ui/CreateProjectCard'
import { AddMemberModal } from '../../features/projects/ui/AddMemberModal'
import { ManageMembersModal } from '../../features/projects/ui/ManageMembersModal'


export const ProjectsPage = () => {
  const { workspaceId } = useParams()
  const dispatch = useAppDispatch()

  const [openAddMember, setOpenAddMember] = useState(false)
  const [openManageMember, setOpenManageMember] = useState(false)

  const workspaceName = useAppSelector((s) => s.workspaces.items.find(w => w.id == workspaceId)?.name)
  const projects = useAppSelector((s) => s.projects.items)
  const loading = useAppSelector((s) => s.projects.loading)

  useEffect(() => {
    if (workspaceId) {
      dispatch(fetchProjects(workspaceId))
    }
  }, [workspaceId, dispatch])

  return (
    <div className="space-y-4">
      
      <div className="p-4 bg-white shadow rounded flex justify-between items-center">
  <div>
    <div className="text-sm text-gray-500">Workspace</div>
    <div className="font-semibold">{workspaceName}</div>
  </div>

  <div className="flex items-center gap-3">
    
    <button 
      onClick={() => setOpenAddMember(true)}
      className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
      + Member
    </button>

    
    <button 
      onClick={() => setOpenManageMember(true)}
      className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
      Manage
    </button>
  </div>
</div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}

            <CreateProjectCard />
        </div>
      )}

      {openAddMember && (
        <AddMemberModal onClose={() => setOpenAddMember(false)} />
        )}
        {openManageMember && (
          <ManageMembersModal onClose={() => setOpenManageMember(false)}/>
        )}
    </div>
  )
}