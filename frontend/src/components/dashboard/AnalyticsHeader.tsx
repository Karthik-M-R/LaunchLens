import { useState } from "react";

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
    <div className="border-b border-[#243342] pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight text-[#F1F5F9]">
            {campaign.name}
          </h1>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Destination</p>
              <a
                href={campaign.destinationUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block wrap-break-word text-sm text-[#22D3C5] transition-colors hover:text-[#14B8A6] hover:underline"
              >
                {campaign.destinationUrl}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Created</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                {new Date(campaign.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 mt-4 lg:mt-0 flex flex-col lg:items-end">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
            Tracking Link
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-[#F1F5F9] bg-[#111923] border border-[#243342] px-3 py-1.5 rounded truncate max-w-50 sm:max-w-75">
              {campaign.trackingLink}
            </span>
            <button
              onClick={copyLink}
              className="px-3 py-1.5 text-sm font-medium text-[#080D14] border border-transparent rounded bg-[#22D3C5] hover:bg-[#14B8A6] transition-colors"
              type="button"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
