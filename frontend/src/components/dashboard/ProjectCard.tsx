import ProjectMenu from "./ProjectMenu";
import { formatDate } from "../../utils/dateUtils";

interface ProjectCardProps {
  id: string;
  name: string;
  website: string;
  description?: string;
  createdAt: string;

  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProjectCard = ({
  name,
  website,
  description,
  createdAt,
  onOpen,
  onEdit,
  onDelete
}: ProjectCardProps) => {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-300">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              {name}
            </h2>
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block truncate text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 hover:underline"
            >
              {website}
            </a>
          </div>
          <ProjectMenu
            onOpen={onOpen}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
        {description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      <p className="mt-6 text-xs text-slate-400 font-medium">
        Created {formatDate(createdAt)}
      </p>
    </div>
  );
};

export default ProjectCard;
