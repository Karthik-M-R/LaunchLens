import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../api/axios";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

interface Project {
  id: string;
  name: string;
  website: string;
  description?: string;
  createdAt: string;
}

const ProjectDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [project, setProject] =
    useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(
          `/projects/${id}`
        );

        setProject(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center">
        Project not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <Sidebar />

      <main className="flex-1">

        <Topbar
          title={project.name}
          subtitle="Project Overview"
        />

        <div className="mx-auto max-w-6xl space-y-8 p-8">

          <Button
            variant="secondary"
            onClick={() => navigate("/projects")}
          >
            ← Back to Projects
          </Button>

          <div className="rounded-2xl bg-white p-8 shadow">

            <h2 className="text-3xl font-bold">

              {project.name}

            </h2>

            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-indigo-600 hover:underline"
            >
              {project.website}
            </a>

            <p className="mt-6 text-gray-600">

              {project.description ||

                "No description provided."}

            </p>

            <p className="mt-6 text-sm text-gray-500">

              Created{" "}

              {new Date(
                project.createdAt
              ).toLocaleDateString()}

            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 shadow">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-semibold">

                Campaigns

              </h2>

              <Button>

                + New Campaign

              </Button>

            </div>

            <div className="mt-10 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">

              <p className="text-gray-500">

                No campaigns yet.

              </p>

              <p className="mt-2 text-sm text-gray-400">

                Create your first campaign to start
                tracking marketing performance.

              </p>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default ProjectDetails;