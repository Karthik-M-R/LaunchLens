import { useNavigate } from "react-router-dom";
import type { Campaign } from "../../types/campaign";
import { formatDate } from "../../utils/dateUtils";

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
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 truncate">
              {campaign.name}
            </h3>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full shrink-0">
              {formatDate(campaign.createdAt)}
            </span>
          </div>
          
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="min-w-0 pr-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Destination URL</p>
              <p className="text-sm font-medium text-slate-700 truncate" title={campaign.destinationUrl}>
                {campaign.destinationUrl}
              </p>
            </div>
            
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Tracking Link</p>
              <div className="flex items-center">
                 <p className="text-sm font-mono text-teal-600 truncate bg-teal-50 border border-teal-100 px-2.5 py-1.5 rounded-lg w-full" title={campaign.trackingLink}>
                   {campaign.trackingLink}
                 </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 md:mt-0 shrink-0">
          <button
            onClick={() => onEdit(campaign)}
            className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:border-slate-300 hover:text-slate-900 transition-colors bg-white shadow-sm"
            type="button"
          >
            Edit
          </button>
          
          <button
            onClick={() => onDelete(campaign)}
            className="px-4 py-2 text-sm font-medium text-rose-600 border border-slate-200 rounded-lg hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 transition-colors bg-white shadow-sm"
            type="button"
          >
            Delete
          </button>

          <button
            onClick={() => navigate(`/campaigns/${campaign.id}/analytics`)}
            className="px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors md:ml-2 shadow-sm"
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
