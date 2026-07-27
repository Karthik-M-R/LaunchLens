import { useEffect, useState } from "react";

import api from "../../api/axios";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import ProjectGrid from "../../components/dashboard/ProjectGrid";

import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

interface Project {
  id: string;
  name: string;
  website: string;
  createdAt: string;
}

const Projects = () => {

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProjects = async () => {

      try {

        const response =
          await api.get("/projects");

        setProjects(response.data.data);

      } finally {

        setLoading(false);

      }

    };

    fetchProjects();

  }, []);

  if (loading) {

    return <Loader />;

  }

  return (

    <div className="min-h-screen bg-gray-50 md:flex">

      <Sidebar />

      <main className="flex-1">

        <Topbar

          title="Projects"

          subtitle="Manage all your marketing projects."

        />

        <div className="p-8">

          {projects.length === 0 ? (

            <EmptyState

              title="No Projects"

              description="Create your first project."

              action={

                <Button>

                  + New Project

                </Button>

              }

            />

          ) : (

            <ProjectGrid

              projects={projects}

            />

          )}

        </div>

      </main>

    </div>

  );

};

export default Projects;