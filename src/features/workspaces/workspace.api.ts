import type { Workspace } from '../../entities/workspace'
import { api } from '../../shared/api/api'

export type CreateWorkspaceParams = { name: string }

export const createWorkspace = async (params: CreateWorkspaceParams): Promise<Workspace> => {
  const res = await api.post<Workspace>('/WorkspaceControllers', params)
  return res.data
}

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const res = await api.get<Workspace[]>('/WorkspaceControllers')
  return res.data
}