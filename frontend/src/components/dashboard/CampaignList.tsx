import CampaignCard from "./CampaignCard";
import EmptyState from "../ui/EmptyState";

import type { Campaign } from "../../types/campaign";

type CampaignListProps = {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
};

const CampaignList = ({
  campaigns,
  onEdit,
  onDelete,
}: CampaignListProps) => {
  if (campaigns.length === 0) {
    return (
      <EmptyState
        title="No campaigns yet"
        description="Create a campaign to start measuring traffic."
      />
    );
  }

  return (
    <div className="grid gap-4">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CampaignList;