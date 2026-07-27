import Card from "../ui/Card";

interface ProjectCardProps {
  id: string;
  name: string;
  website: string;
  createdAt: string;
}

const ProjectCard = ({
  id,
  name,
  website,
  createdAt,
}: ProjectCardProps) => {
  return (
    <Card className="transition hover:shadow-md">

      <div className="space-y-4">

        <div>

          <h2 className="text-xl font-semibold text-gray-900">

            {name}

          </h2>

          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-sm text-indigo-600 hover:underline"
          >
            {website}
          </a>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-sm text-gray-500">

            {new Date(createdAt).toLocaleDateString()}

          </span>

          <button
            className="
              rounded-lg
              bg-gray-100
              px-3
              py-2
              text-sm
              font-medium
              transition
              hover:bg-indigo-600
              hover:text-white
            "
          >
            Open
          </button>

        </div>

      </div>

    </Card>
  );
};

export default ProjectCard;