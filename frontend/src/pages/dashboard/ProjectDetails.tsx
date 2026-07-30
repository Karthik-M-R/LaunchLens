import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../api/axios";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import CampaignList from "../../components/dashboard/CampaignList";

import type { Campaign } from "../../types/campaign";
import CampaignFormModal from "../../components/dashboard/CampaignFormModal";

import type { CampaignFormData } from "../../validation/campaign";

import DeleteCampaignDialog from "../../components/dashboard/DeleteCampaignDialog";
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

<Button onClick={openCreateModal}>
  + New Campaign
</Button>

            </div>

            <div className="mt-8">

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
      </main>
    </div>
  );
};

export default ProjectDetails;