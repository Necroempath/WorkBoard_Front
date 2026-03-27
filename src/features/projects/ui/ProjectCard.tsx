import { useNavigate } from "react-router-dom"
import type { Project } from "../../../entities/project"

export const ProjectCard = ({ project }: { project: Project }) => {
    const navigate = useNavigate()
     
  return (
    <div 
     onClick={() => navigate(`/board/${project.id}`)}

     className="p-4 bg-white rounded shadow hover:bg-gray-50 cursor-pointer">
      {project.name}
    </div>
  )
}