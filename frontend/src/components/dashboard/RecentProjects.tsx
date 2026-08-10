import Button from "../ui/Button";
import { Folder } from "lucide-react";

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
    <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">
        Recent Projects
      </h2>
      <div className="h-px bg-slate-100 w-full mb-2" />

      {projects.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100/80 shadow-sm">
            <Folder className="h-8 w-8 text-slate-400 stroke-[1.5]" />
          </div>
          <p className="text-lg font-semibold text-slate-900 mb-2">No projects yet</p>
          <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
            Create your first workspace to start tracking campaign performance.
          </p>
          <Button variant="primary" className="px-6 shadow-sm">
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
              <p className="font-medium text-slate-900 hover:text-teal-600 transition-colors cursor-pointer inline-block">
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
