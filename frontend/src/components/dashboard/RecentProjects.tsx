import Button from "../ui/Button";

interface Project {
  id: string;
  name: string;
}

interface RecentProjectsProps {
  projects: Project[];
}

const RecentProjects = ({
  projects,
}: RecentProjectsProps) => {

  return (
    <div className="flex flex-col">
      <h2 className="text-xs font-semibold tracking-wider text-[#94A3B8] uppercase mb-3">
        RECENT PROJECTS
      </h2>
      <div className="h-px bg-[#243342] w-full mb-2" />

      {projects.length === 0 ? (
        <div className="py-4">
          <p className="text-[#F1F5F9] font-medium mb-1">No projects yet</p>
          <p className="text-sm text-[#94A3B8] mb-4">
            Create your first workspace to start tracking campaign performance.
          </p>
          <Button variant="primary">
            + New Project
          </Button>
        </div>
      ) : (
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`py-4 ${index !== projects.length - 1 ? 'border-b border-[#243342]' : ''}`}
            >
              <p className="font-medium text-[#F1F5F9]">
                {project.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentProjects;
