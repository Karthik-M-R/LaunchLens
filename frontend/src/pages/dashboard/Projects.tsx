import { useState } from "react";
import { Plus } from "lucide-react";

import type { Project } from "../../data/projects";
import type { CreateProjectFormData } from "../../validation/project";

import ProjectGrid from "../../components/dashboard/projects/ProjectGrid";
import EmptyProjects from "../../components/dashboard/projects/EmptyProjects";
import CreateProjectModal from "../../components/dashboard/projects/CreateProjectModal";

const Projects = () => {
  const [open, setOpen] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);

  const handleCreateProject = (data: CreateProjectFormData) => {
    const project: Project = {
      id: crypto.randomUUID(),

      name: data.name,

      slug: data.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-"),

      description: data.description || "",

      website: data.website || "",

      totalCampaigns: 0,

      totalClicks: 0,

      createdAt: new Date().toLocaleDateString(),
    };

    setProjects((prev) => [...prev, project]);

    setOpen(false);
  };

  const handleDeleteProject = (id: string) => {
  const confirmDelete = window.confirm(
    "Delete this project?"
  );

  if (!confirmDelete) return;

  setProjects((prev) =>
    prev.filter((project) => project.id !== id)
  );
};

  return (
    <>
      <div>
        {/* Header */}

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">Projects</h1>

            <p className="mt-2 text-gray-600">
              Manage all your products and marketing workspaces.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-2xl border-4 border-black bg-indigo-500 px-6 py-4 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1"
          >
            <Plus size={20} />

            New Project
          </button>
        </div>

        {/* Content */}

        {projects.length === 0 ? (
          <EmptyProjects onCreate={() => setOpen(true)} />
        ) : (
          <ProjectGrid
    projects={projects}
    onDelete={handleDeleteProject}
/>
        )}
      </div>

      {/* Modal */}

      <CreateProjectModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreateProject}
      />
    </>
  );
};

export default Projects;