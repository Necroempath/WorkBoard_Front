import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchProjects } from '../../features/projects/projects.slice'
import { ProjectCard } from '../../features/projects/ui/ProjectCard'
import { CreateProjectCard } from '../../features/projects/ui/CreateProjectCard'


export const ProjectsPage = () => {
  const { workspaceId } = useParams()
  const dispatch = useAppDispatch()

  const projects = useAppSelector((s) => s.projects.items)
  const loading = useAppSelector((s) => s.projects.loading)

  useEffect(() => {
    if (workspaceId) {
      dispatch(fetchProjects(workspaceId))
    }
  }, [workspaceId, dispatch])

  return (
    <div className="space-y-4">
      
      <div className="p-4 bg-white shadow rounded">
        Workspace: {workspaceId}
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
    </div>
  )
}