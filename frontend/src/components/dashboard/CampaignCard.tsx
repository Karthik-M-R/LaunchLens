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
    <div className="flex flex-col rounded-lg border border-[#243342] bg-[#111923] p-5">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold tracking-tight text-[#F1F5F9] truncate">
              {campaign.name}
            </h3>
            <span className="text-xs text-[#94A3B8] bg-[#16222E] border border-[#243342] px-2 py-0.5 rounded-full shrink-0">
              {new Date(campaign.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="min-w-0 pr-4">
              <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider mb-1">Destination URL</p>
              <p className="text-sm text-[#F1F5F9] truncate" title={campaign.destinationUrl}>
                {campaign.destinationUrl}
              </p>
            </div>
            
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider mb-1">Tracking Link</p>
              <div className="flex items-center">
                 <p className="text-sm text-[#22D3C5] truncate bg-[#080D14] border border-[#243342] px-2 py-1 rounded w-full" title={campaign.trackingLink}>
                   {campaign.trackingLink}
                 </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 md:mt-0 shrink-0">
          <button
            onClick={() => onEdit(campaign)}
            className="px-3 py-1.5 text-sm font-medium text-[#94A3B8] border border-[#243342] rounded hover:border-[#38BDF8] hover:text-[#F1F5F9] transition-colors bg-[#16222E]"
            type="button"
          >
            Edit
          </button>
          
          <button
            onClick={() => onDelete(campaign)}
            className="px-3 py-1.5 text-sm font-medium text-[#FB7185] border border-[#243342] rounded hover:bg-[#FB7185]/10 hover:border-[#FB7185] transition-colors bg-[#16222E]"
            type="button"
          >
            Delete
          </button>

          <button
            onClick={() => navigate(`/campaigns/${campaign.id}/analytics`)}
            className="px-4 py-1.5 text-sm font-semibold text-[#080D14] border border-transparent rounded bg-[#22D3C5] hover:bg-[#14B8A6] transition-colors md:ml-2"
            type="button"
          >
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
