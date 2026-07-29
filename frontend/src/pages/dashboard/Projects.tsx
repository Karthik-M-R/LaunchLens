import { useCallback, useEffect, useState } from "react";

import api from "../../api/axios";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import ProjectGrid from "../../components/dashboard/ProjectGrid";
import CreateProjectModal from "../../components/dashboard/CreateProjectModal";

import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

import type { CreateProjectFormData } from "../../validation/project";

interface Project {
  id: string;
  name: string;
  website: string;
  createdAt: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (
    data: CreateProjectFormData
  ) => {
    try {
      await api.post("/projects", data);

      await fetchProjects();

      setOpenModal(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

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
          action={
            <Button
              onClick={() => setOpenModal(true)}
              className="
                rounded-xl
                bg-indigo-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-indigo-700
                hover:shadow-md
              "
            >
              + New Project
            </Button>
          }
        />

        <div className="p-8">
          {projects.length === 0 ? (
            <EmptyState
              title="No Projects Yet"
              description="Create your first marketing project to start tracking campaigns."
            />
          ) : (
            <ProjectGrid projects={projects} />
          )}
        </div>

        <CreateProjectModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onCreate={createProject}
        />
      </main>
    </div>
  );
};

export default Projects;