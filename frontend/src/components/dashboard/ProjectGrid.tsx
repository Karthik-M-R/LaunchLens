import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  name: string;
  website: string;
  createdAt: string;
}

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid = ({
  projects,
}: ProjectGridProps) => {
  return (

    <div
      className="
        grid
        gap-6

        md:grid-cols-2

        xl:grid-cols-3
      "
    >

      {projects.map((project) => (

        <ProjectCard

          key={project.id}

          {...project}

        />

      ))}

    </div>

  );
};

export default ProjectGrid;