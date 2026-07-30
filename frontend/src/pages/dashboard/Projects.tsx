import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import ProjectGrid from "../../components/dashboard/ProjectGrid";
import ProjectFormModal from "../../components/dashboard/ProjectFormModal";
import DeleteProjectDialog from "../../components/dashboard/DeleteProjectDialog";

import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

import type { CreateProjectFormData } from "../../validation/project";

interface Project {
  id: string;
  name: string;
  website: string;
  description?: string;
  createdAt: string;
}

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [mode, setMode] =
    useState<"create" | "edit">("create");

  const [openDeleteDialog, setOpenDeleteDialog] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

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

  const openCreateModal = () => {
    setMode("create");
    setSelectedProject(null);
    setOpenModal(true);
  };

  const openEditModal = (project: Project) => {
    setMode("edit");
    setSelectedProject(project);
    setOpenModal(true);
  };

  const handleOpenDeleteDialog = (
    project: Project
  ) => {
    setSelectedProject(project);
    setOpenDeleteDialog(true);
  };

  const openProject = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  const createProject = async (
    data: CreateProjectFormData
  ) => {
    try {
      await api.post("/projects", data);

      await fetchProjects();

      setOpenModal(false);
    } catch (error) {
      console.error(
        "Failed to create project:",
        error
      );
    }
  };

  const updateProject = async (
    data: CreateProjectFormData
  ) => {
    if (!selectedProject) return;

    try {
      await api.patch(
        `/projects/${selectedProject.id}`,
        data
      );

      await fetchProjects();

      setOpenModal(false);
      setSelectedProject(null);
      setMode("create");
    } catch (error) {
      console.error(
        "Failed to update project:",
        error
      );
    }
  };

  const deleteProject = async () => {
    if (!selectedProject) return;

    try {
      setDeleting(true);

      await api.delete(
        `/projects/${selectedProject.id}`
      );

      await fetchProjects();

      setOpenDeleteDialog(false);
      setSelectedProject(null);
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error
      );
    } finally {
      setDeleting(false);
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
              onClick={openCreateModal}
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
            <ProjectGrid
              projects={projects}
              onOpen={openProject}
              onEdit={openEditModal}
              onDelete={handleOpenDeleteDialog}
            />
          )}
        </div>

        <ProjectFormModal
          open={openModal}
          mode={mode}
          project={selectedProject ?? undefined}
          onClose={() => {
            setOpenModal(false);
            setSelectedProject(null);
            setMode("create");
          }}
          onSubmit={
            mode === "create"
              ? createProject
              : updateProject
          }
        />

        <DeleteProjectDialog
          open={openDeleteDialog}
          projectName={selectedProject?.name}
          loading={deleting}
          onClose={() => {
            setOpenDeleteDialog(false);
            setSelectedProject(null);
          }}
          onDelete={deleteProject}
        />
      </main>
    </div>
  );
};

export default Projects;