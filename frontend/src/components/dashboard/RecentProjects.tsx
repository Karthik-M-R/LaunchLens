import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";
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

    <Card>

      <h2 className="mb-6 text-xl font-semibold text-gray-900">

        Recent Projects

      </h2>

      {projects.length === 0 ? (

        <EmptyState

          title="No Projects"

          description="Create your first project to start tracking campaigns."

          action={

            <Button>

              Create Project

            </Button>

          }

        />

      ) : (

        <div className="space-y-4">

          {projects.map((project) => (

            <div

              key={project.id}

              className="rounded-xl border border-gray-200 p-4"

            >

              <p className="font-medium">

                {project.name}

              </p>

            </div>

          ))}

        </div>

      )}

    </Card>

  );

};

export default RecentProjects;