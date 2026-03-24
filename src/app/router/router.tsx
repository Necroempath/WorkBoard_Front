import { createBrowserRouter } from 'react-router-dom'
import ProjectsPage from '../../pages/projects/ProjectsPage'
import BoardPage from '../../pages/board/BoardPage'
import { AppLayout } from '../layout/AppLayout'
import { LoginPage } from '../../pages/login/LoginPage'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ProjectsPage />,
      },
      {
        path: 'projects/:projectId',
        element: <BoardPage />,
      },
    ],
  },
])