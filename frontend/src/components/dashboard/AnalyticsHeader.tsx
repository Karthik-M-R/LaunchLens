import { useState } from "react";
import { formatDate } from "../../utils/dateUtils";

interface Props {
  campaign: {
    name: string;
    destinationUrl: string;
    trackingLink: string;
    createdAt: string;
  };
}

const AnalyticsHeader = ({
  campaign,
}: Props) => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(campaign.trackingLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="border-b border-slate-200 pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            {campaign.name}
          </h1>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Destination</p>
              <a
                href={campaign.destinationUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block wrap-break-word text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 hover:underline"
              >
                {campaign.destinationUrl}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Created</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {formatDate(campaign.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 mt-4 lg:mt-0 flex flex-col lg:items-end">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            Tracking Link
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-slate-800 bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg truncate max-w-50 sm:max-w-75">
              {campaign.trackingLink}
            </span>
            <button
              onClick={copyLink}
              className="px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm"
              type="button"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
