import { Outlet } from 'react-router-dom'
import { UserMenu } from '../../features/auth/ui/UserMenu'
import { authStorage } from '../../features/auth/auth.storage'

const user = authStorage.getUser()

export function AppLayout() {
  return (
    <div className="d min-h-screen bg-gray-100">
      <header className="h-14 bg-white shadow flex justify-between items-center px-10">
        <span className="font-semibold">Kanban</span>

        <UserMenu user={ user }/>
      </header>

      <main className="p-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}