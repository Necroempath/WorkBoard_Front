
import { useEffect, useState } from 'react'
import { getWorkspaces } from './workspace.api'
import type { Workspace } from '../../entities/workspace'

export const useWorkspaces = () => {
  const [data, setData] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWorkspaces()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}