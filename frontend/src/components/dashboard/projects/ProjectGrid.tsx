import type { Project } from "../../../data/projects";
import ProjectCard from "./ProjectCard";

type Props = {
  projects: Project[];
  onDelete: (id: string) => void;
};

const ProjectGrid = ({ projects, onDelete }: Props) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {projects.map((project) => (

        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
        />

      ))}

    </div>
  );
};

export default ProjectGrid;