import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchBoard } from '../../features/board/board.slice'
import { BoardView } from '../../features/board/ui/BoardView'


export const BoardPage = () => {
  const { projectId } = useParams()
  const dispatch = useAppDispatch()

  const project = useAppSelector((s) => s.board.project)
  const loading = useAppSelector((s) => s.board.loading)

  useEffect(() => {
    if (projectId) {
      dispatch(fetchBoard(projectId))
    }
  }, [projectId, dispatch])

  if (loading || !project) return <div>Loading...</div>
  console.log(project)
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{project.name}</h1>
      <BoardView columns={project.columns} />
    </div>
  )
}