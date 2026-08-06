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

  const [copied, setCopied] =
    useState(false);

  const copyLink = async () => {

    await navigator.clipboard.writeText(
      campaign.trackingLink
    );

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  };

  return (

    <div className="rounded-2xl bg-white p-8 shadow">

      <h1 className="text-3xl font-bold">
        {campaign.name}
      </h1>

      <div className="mt-8 space-y-6">

        <div>

          <p className="mb-2 text-sm font-medium text-gray-500">
            Tracking Link
          </p>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">

            <a
              href={campaign.trackingLink}
              target="_blank"
              rel="noreferrer"
              className="
                break-all
                text-indigo-600
                hover:underline
              "
            >
              {campaign.trackingLink}
            </a>

            <button
              onClick={copyLink}
              className="
                rounded-lg
                bg-indigo-600
                px-4
                py-2
                text-white
                transition
                hover:bg-indigo-700
              "
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>

          </div>

        </div>

        <div>

          <p className="mb-2 text-sm font-medium text-gray-500">
            Destination URL
          </p>

          <a
            href={campaign.destinationUrl}
            target="_blank"
            rel="noreferrer"
            className="
              break-all
              text-gray-800
              hover:text-indigo-600
              hover:underline
            "
          >
            {campaign.destinationUrl}
          </a>

        </div>

        <div>

          <p className="mb-2 text-sm font-medium text-gray-500">
            Created
          </p>

          <p className="text-gray-700">
            {new Date(
              campaign.createdAt
            ).toLocaleString()}
          </p>

        </div>

      </div>

    </div>

  );

};

export default AnalyticsHeader;