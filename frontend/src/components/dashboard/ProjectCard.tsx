import ProjectMenu from "./ProjectMenu";

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
    <div className="flex flex-col justify-between rounded-lg border border-[#243342] bg-[#111923] p-5 transition-colors hover:border-[#38BDF8]/50">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight text-[#F1F5F9]">
              {name}
            </h2>
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block truncate text-sm text-[#22D3C5] transition-colors hover:text-[#14B8A6] hover:underline"
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
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#94A3B8]">
            {description}
          </p>
        )}
      </div>
      <p className="mt-4 text-xs text-[#94A3B8]">
        Created {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProjectCard;
