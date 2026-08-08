import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../api/axios";

import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import CampaignList from "../../components/dashboard/CampaignList";

import type { Campaign } from "../../types/campaign";
import CampaignFormModal from "../../components/dashboard/CampaignFormModal";

import type { CampaignFormData } from "../../validation/campaign";

import DeleteCampaignDialog from "../../components/dashboard/DeleteCampaignDialog";
import DashboardShell from "../../components/dashboard/DashboardShell";
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

  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const [campaignLoading, setCampaignLoading] =
    useState(true);
const [openModal, setOpenModal] =
  useState(false);

const [mode, setMode] =
  useState<"create" | "edit">("create");

const [selectedCampaign, setSelectedCampaign] =
  useState<Campaign | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] =
  useState(false);

const [deleting, setDeleting] =
  useState(false);


  const fetchProject = async () => {
    try {
      const response = await api.get(
        `/projects/${id}`
      );

      setProject(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await api.get(
        `/projects/${id}/campaigns`
      );

      setCampaigns(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCampaignLoading(false);
    }
  };
const openCreateModal = () => {
  setMode("create");
  setSelectedCampaign(null);
  setOpenModal(true);
};

const openEditModal = (
  campaign: Campaign
) => {
  setMode("edit");
  setSelectedCampaign(campaign);
  setOpenModal(true);
};

const openDeleteCampaignDialog = (
  campaign: Campaign
) => {
  setSelectedCampaign(campaign);
  setOpenDeleteDialog(true);
};
const createCampaign = async (
  data: CampaignFormData
) => {
  try {
    await api.post(
      `/projects/${id}/campaigns`,
      data
    );

    setOpenModal(false);

    fetchCampaigns();
  } catch (error) {
    console.error(error);
  }
};

const updateCampaign = async (
  data: CampaignFormData
) => {
  if (!selectedCampaign) return;

  try {
    await api.patch(
      `/campaigns/${selectedCampaign.id}`,
      data
    );

    setOpenModal(false);

    fetchCampaigns();
  } catch (error) {
    console.error(error);
  }
};

const deleteCampaign = async () => {
  if (!selectedCampaign) return;

  try {
    setDeleting(true);

    await api.delete(
      `/campaigns/${selectedCampaign.id}`
    );

    setOpenDeleteDialog(false);

    setSelectedCampaign(null);

    fetchCampaigns();
  } catch (error) {
    console.error(error);
  } finally {
    setDeleting(false);
  }
};

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchProject(),
          fetchCampaigns(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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
    <DashboardShell
      title="Project Overview"
      subtitle="Manage campaigns and measure their performance."
    >
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">

          <Button
            variant="secondary"
            onClick={() => navigate("/projects")}
            className="mb-4"
          >
            ← Back to Projects
          </Button>

          <div className="pt-4 pb-8 border-b border-[#243342]">
            <h2 className="text-3xl font-semibold tracking-tight text-[#F1F5F9]">
              {project.name}
            </h2>

            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block break-words text-sm text-[#22D3C5] transition-colors duration-200 hover:text-[#14B8A6] hover:underline"
            >
              {project.website}
            </a>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#94A3B8]">
              {project.description || "No description provided."}
            </p>
          </div>

          <div className="pt-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-sm font-semibold tracking-wider text-[#94A3B8] uppercase">
                CAMPAIGNS
              </h2>

              <Button onClick={openCreateModal}>
                + New Campaign
              </Button>
            </div>

            <div>
              {campaignLoading ? (
                <Loader />
              ) : (
                <CampaignList
                  campaigns={campaigns}
                  onEdit={openEditModal}
                  onDelete={openDeleteCampaignDialog}
                />
              )}
            </div>
          </div>
        </div>
        <CampaignFormModal
          open={openModal}
          mode={mode}
          campaign={selectedCampaign}
          onClose={() => setOpenModal(false)}
          onSubmit={
            mode === "create"
              ? createCampaign
              : updateCampaign
          }
        />

        <DeleteCampaignDialog
          open={openDeleteDialog}
          campaignName={selectedCampaign?.name ?? ""}
          loading={deleting}
          onClose={() => setOpenDeleteDialog(false)}
          onDelete={deleteCampaign}
        />
    </DashboardShell>
  );
};

export default ProjectDetails;
