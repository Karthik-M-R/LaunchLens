import Card from "../ui/Card";
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
    <Card className="transition hover:shadow-lg">
  <div className="space-y-5">
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          {name}
        </h2>

        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="mt-1 block text-sm text-indigo-600 hover:underline"
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
      <p className="line-clamp-2 text-sm text-gray-600">
        {description}
      </p>
    )}

    <p className="text-sm text-gray-500">
      Created{" "}
      {new Date(createdAt).toLocaleDateString()}
    </p>
  </div>
</Card>
  );
};

export default ProjectCard;