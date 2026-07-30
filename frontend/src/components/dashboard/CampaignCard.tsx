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
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {campaign.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Tracking Code
          </p>

          <p className="font-medium">
            {campaign.trackingCode}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(campaign)}
            className="text-sm text-blue-600 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(campaign)}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-500">
          Destination URL
        </p>

        <p className="break-all text-sm">
          {campaign.destinationUrl}
        </p>
      </div>

      <div className="mt-5 text-sm text-gray-500">
        Clicks: 0
      </div>
    </div>
  );
};

export default CampaignCard;