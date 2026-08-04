import { useNavigate } from "react-router-dom";

import type { Campaign } from "../../types/campaign";

type CampaignCardProps = {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
};

const CampaignCard = ({
  campaign,
  onEdit,
  onDelete,
}: CampaignCardProps) => {

  const navigate = useNavigate();

  return (

    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold">

            {campaign.name}

          </h3>

          <p className="mt-2 text-sm text-gray-500">

            Tracking Link

          </p>

          <p className="break-all text-sm text-indigo-600">

            {campaign.trackingLink}

          </p>

        </div>

        <div className="flex flex-col gap-2">

          <button
            onClick={() => onEdit(campaign)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(campaign)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>

          <button
            onClick={() =>
              navigate(
                `/campaigns/${campaign.id}/analytics`
              )
            }
            className="font-medium text-indigo-600 hover:underline"
          >
            Analytics →
          </button>

        </div>

      </div>

      <div className="mt-6">

        <p className="text-sm text-gray-500">

          Destination URL

        </p>

        <p className="break-all text-sm">

          {campaign.destinationUrl}

        </p>

      </div>

    </div>

  );

};

export default CampaignCard;