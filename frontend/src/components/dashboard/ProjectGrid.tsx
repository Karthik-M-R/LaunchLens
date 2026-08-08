import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  name: string;
  website: string;
  description?: string;
  createdAt: string;
}

interface ProjectGridProps {
  projects: Project[];

  onOpen: (project: Project) => void;

  onEdit: (project: Project) => void;

  onDelete: (project: Project) => void;
}

const ProjectGrid = ({
  projects,
  onOpen,
  onEdit,
  onDelete
}: ProjectGridProps) => {
  return (

    <div
      className="
        grid
        gap-4

        sm:grid-cols-2

        md:grid-cols-2

        xl:grid-cols-3
      "
    >

      {projects.map((project) => (

<ProjectCard
  key={project.id}
  {...project}
  onOpen={() => onOpen(project)}
  onEdit={() => onEdit(project)}
  onDelete={() => onDelete(project)}
/>

      ))}

    </div>

  );
};

export default ProjectGrid;