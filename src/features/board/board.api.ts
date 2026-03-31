import type { Project } from '../../entities/project'
import { api } from '../../shared/api/api'

export type CreateColumnParams = { projectId: string; name: string }

export const moveIssueApi = async (params: {
  issueId: string
  targetColumnId: string
  newOrder: number
}) => {
  await api.patch('/issues', params)
}

export const createIssue = async (params: {
  columnId: string
  projectId: string
  title: string
  description?: string
  priority: number
}) => {
  const res = await api.post('/issues', params)
  return res.data
}

export const createColumn = async (params: CreateColumnParams) => {
  const res = await api.post('/columns', params)
  return res.data
}

export const getProject = async (projectId: string): Promise<Project> => {
  const res = await api.get(`/projects/${projectId}`)
  return res.data
}