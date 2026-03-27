import type { Project } from '../../entities/project'
import { api } from '../../shared/api/api'

export const getProject = async (projectId: string): Promise<Project> => {
  const res = await api.get(`/ProjectControllers/${projectId}`)
  return res.data
}