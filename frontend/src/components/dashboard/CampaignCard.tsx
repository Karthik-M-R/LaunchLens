import { useState } from "react";

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
  const [copied, setCopied] =
    useState(false);

  const copyTrackingLink = async () => {
    try {
      await navigator.clipboard.writeText(
        campaign.trackingLink
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-semibold text-gray-900">
            {campaign.name}
          </h3>

          <p className="mt-4 text-sm font-medium text-gray-500">
            Destination URL
          </p>

          <a
            href={campaign.destinationUrl}
            target="_blank"
            rel="noreferrer"
            className="break-all text-sm text-indigo-600 hover:underline"
          >
            {campaign.destinationUrl}
          </a>

        </div>

        <div className="flex gap-4">

          <button
            onClick={() => onEdit(campaign)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(campaign)}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Delete
          </button>

        </div>

      </div>

      <div className="mt-6 rounded-xl bg-gray-50 p-4">

        <p className="text-sm font-medium text-gray-500">
          Tracking Link
        </p>

        <p className="mt-2 break-all text-sm font-medium text-gray-900">
          {campaign.trackingLink}
        </p>

        <button
          onClick={copyTrackingLink}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          {copied
            ? "Copied!"
            : "📋 Copy Link"}
        </button>

      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">

       <div className="mt-5 grid grid-cols-2 gap-4">

  <div className="rounded-lg bg-gray-50 p-3">

    <p className="text-xs text-gray-500">
      Total Clicks
    </p>

    <p className="mt-1 text-xl font-bold">
      {campaign.totalClicks}
    </p>

  </div>

  <div className="rounded-lg bg-gray-50 p-3">

    <p className="text-xs text-gray-500">
      Unique Visitors
    </p>

    <p className="mt-1 text-xl font-bold">
      {campaign.uniqueVisitors}
    </p>

  </div>

</div>

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Created
          </p>

          <p className="mt-2 text-sm font-medium">
            {new Date(
              campaign.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

      </div>

    </div>
  );
};

export default CampaignCard;