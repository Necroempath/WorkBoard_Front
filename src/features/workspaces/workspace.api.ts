import type { Workspace, WorkspaceDetails } from '../../entities/workspace'
import { api } from '../../shared/api/api'

export type CreateWorkspaceParams = { name: string }

export const createWorkspace = async (params: CreateWorkspaceParams): Promise<Workspace> => {
  const res = await api.post<Workspace>('/workspaces', params)
  return res.data
}

export const getWorkspace = async(workspaceId: string): Promise<WorkspaceDetails> => {
    const res = await api.get<WorkspaceDetails>(`/workspaces/${workspaceId}`)
    return res.data
}

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const res = await api.get<Workspace[]>('/workspaces')
  return res.data
}