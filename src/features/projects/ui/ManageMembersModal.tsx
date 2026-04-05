import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { canManageUser } from '../../../shared/permissions'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { fetchMembersAsync, removeMemberAsync, updateMemberRoleAsync } from '../../workspaces/workspace.slice'
import { ShowNotification } from '../../../shared/ui/ShowNotification'


export const ManageMembersModal = ({ onClose }: { onClose: () => void }) => {
  const { workspaceId } = useParams()
 
  const dispatch = useAppDispatch()

  const members = useAppSelector(s => s.workspaces.members)
  
  const currentUserRole = useAppSelector(s => s.workspaces.currentUserRole)

  useEffect(() => {
    if (workspaceId) {
      dispatch(fetchMembersAsync(workspaceId))
    }
  }, [workspaceId])

  const handleRoleChange = async (userId: string, role: number) => {
    const result = await dispatch(updateMemberRoleAsync({
      workspaceId: workspaceId!,
      userId,
      role
    }))

    if (updateMemberRoleAsync.rejected.match(result)) {
      ShowNotification('Failed to update role', 'error')
    }
  }

  const handleRemove = async (userId: string) => {
    const confirmed = confirm('Remove this user?')
    if (!confirmed) return

    const result = await dispatch(removeMemberAsync({
      workspaceId: workspaceId!,
      userId
    }))

    if (removeMemberAsync.fulfilled.match(result)) {
      ShowNotification('User removed', 'success')
    } else {
      ShowNotification('Failed to remove user', 'error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-150">
        
        <h2 className="text-lg font-semibold mb-4">Members</h2>

        <div className="space-y-2">
          {members.map(m => {
            const canManage = canManageUser(currentUserRole, m.role)

            return (
              <div
                key={m.userId}
                className="grid grid-cols-4 items-center gap-2 p-2 border rounded"
              >
                <div>{m.name}</div>
                <div className="text-gray-500">{m.email}</div>

                <div>
                  <select
                    value={m.role}
                    disabled={!canManage || m.role === 0}
                    onChange={(e) =>
                      handleRoleChange(m.userId, Number(e.target.value))
                    }
                    className="border p-1 rounded disabled:opacity-50"
                  >
                    <option value={1}>Admin</option>
                    <option value={2}>Member</option>
                    <option value={3}>Viewer</option>
                  </select>
                </div>

                <div>
                  {canManage && (
                    <button
                      onClick={() => handleRemove(m.userId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}