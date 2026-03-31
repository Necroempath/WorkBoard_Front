import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchBoard } from '../../features/board/board.slice'
import { BoardView } from '../../features/board/ui/BoardView'
import { CreateColumnModal } from '../../features/board/ui/CreateColumnModal'
import { IconButton } from '../../shared/ui/IconButton'


export const BoardPage = () => {
  const { projectId } = useParams()
  const dispatch = useAppDispatch()

  const project = useAppSelector((s) => s.board.project)
  const loading = useAppSelector((s) => s.board.loading)

  const [openColumnModal, setOpenColumnModal] = useState(false)

  useEffect(() => {
    if (projectId) {
      dispatch(fetchBoard(projectId))
    }
  }, [projectId, dispatch])

  if (loading || !project) return <div>Loading...</div>

  return (
    <div className="p-6 h-full bg-gray-50">
      
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-xl font-semibold">{project.name}</h1>

      <IconButton
        variant="blue"
        onClick={() => setOpenColumnModal(true)}
      />
      </div>

      <BoardView columns={project.columns} />

      {openColumnModal && (
        <CreateColumnModal onClose={() => setOpenColumnModal(false)} />
      )}
    </div>
  )
}