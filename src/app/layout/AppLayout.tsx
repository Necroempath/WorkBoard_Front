import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="h-14 bg-white shadow flex items-center px-4">
        <span className="font-semibold">Kanban</span>
      </header>

      <main className="p-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}