import {
  ArrowRight,
  Calendar,
  Globe,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { Project } from "../../../data/projects";

type Props = {
  project: Project;
  onDelete: (id: string) => void;
};

const ProjectCard = ({ project, onDelete }: Props) => {
  return (
    <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-black">
            {project.name}
          </h2>

          {project.description && (
            <p className="mt-2 text-sm text-gray-600">
              {project.description}
            </p>
          )}

        </div>

        <button
          onClick={() => onDelete(project.id)}
          className="rounded-xl border-2 border-black bg-red-100 p-2 transition hover:bg-red-200"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* Info */}

      <div className="mt-6 space-y-3 text-sm">

        {project.website && (
          <div className="flex items-center gap-2">

            <Globe size={16} />

            {project.website}

          </div>
        )}

        <div className="flex items-center gap-2">

          <Calendar size={16} />

          {project.createdAt}

        </div>

      </div>

      {/* Stats */}

      <div className="mt-8 flex justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Campaigns
          </p>

          <h3 className="text-2xl font-black">
            {project.totalCampaigns}
          </h3>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Clicks
          </p>

          <h3 className="text-2xl font-black">
            {project.totalClicks}
          </h3>

        </div>

      </div>

      {/* Footer */}

      <Link
        to={`/dashboard/projects/${project.id}`}
        className="mt-8 flex items-center justify-center gap-2 rounded-2xl border-4 border-black bg-indigo-500 py-3 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1"
      >

        Open Project

        <ArrowRight size={18} />

      </Link>

    </div>
  );
};

export default ProjectCard;