import type { Workspace } from '../../entities/workspace'
import { api } from '../../shared/api/api'

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const res = await api.get<Workspace[]>('/WorkspaceControllers')
  return res.data
}