import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { authStorage } from '../../features/auth/auth.storage'
import { ShowNotification } from '../../shared/ui/ShowNotification'
import { changePasswordAsync, updateUserAsync } from '../../features/user/user.slice'
import { useNavigate } from 'react-router-dom'

export const UserPage = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate();
  
  const user = authStorage.getUser()

  const [name, setName] = useState(user?.name || '')
  const [initialName] = useState(user?.name || '')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loadingProfile, setLoadingProfile] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)

  const isNameValid = name.trim().length >= 3
  const isNameChanged = name !== initialName

  const isPasswordValid =
    oldPassword.length >= 6 &&
    newPassword.length >= 6 &&
    newPassword === confirmPassword

  const handleSaveProfile = async () => {
    if (!isNameValid || !isNameChanged) return

    setLoadingProfile(true)

    const result = await dispatch(updateUserAsync({ name }))

    setLoadingProfile(false)

    if (updateUserAsync.fulfilled.match(result)) {
      ShowNotification('Profile updated', 'success')
    } else {
      ShowNotification('Failed to update profile', 'error')
    }
  }

const handleChangePassword = async () => {
  if (!isPasswordValid) return

  setLoadingPassword(true)

  const result = await dispatch(
    changePasswordAsync({
      oldPassword,
      newPassword,
      confirmPassword
    })
  )

  setLoadingPassword(false)

  if (changePasswordAsync.fulfilled.match(result)) {
    ShowNotification('Password changed. Please login again', 'success')

    setTimeout(() => {
      navigate('/login')
    }, 800)
  } else {
    ShowNotification('Incorrect password', 'error')
  }
}

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div className="bg-white p-4 rounded-xl shadow">
        <h1 className="text-xl font-semibold">Profile Settings</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Personal Info</h2>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {!isNameValid && (
            <p className="text-sm text-red-500">
              Name must be at least 3 characters
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveProfile}
            disabled={!isNameValid || !isNameChanged || loadingProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Change Password</h2>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {newPassword !== confirmPassword && confirmPassword.length > 0 && (
          <p className="text-sm text-red-500">
            Passwords do not match
          </p>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleChangePassword}
            disabled={!isPasswordValid || loadingPassword}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}