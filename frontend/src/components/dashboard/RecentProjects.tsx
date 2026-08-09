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
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-3">
        RECENT PROJECTS
      </h2>
      <div className="h-px bg-slate-200 w-full mb-2" />

      {projects.length === 0 ? (
        <div className="py-4">
          <p className="text-slate-900 font-medium mb-1">No projects yet</p>
          <p className="text-sm text-slate-500 mb-4">
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
              className={`py-4 ${index !== projects.length - 1 ? 'border-b border-slate-100' : ''}`}
            >
              <p className="font-medium text-slate-900">
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
