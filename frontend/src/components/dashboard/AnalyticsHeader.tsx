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
  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <h1 className="text-3xl font-bold">
        {campaign.name}
      </h1>

      <div className="mt-6 space-y-4">

        <div>

          <p className="text-sm text-gray-500">
            Tracking Link
          </p>

          <a
            href={campaign.trackingLink}
            target="_blank"
            rel="noreferrer"
            className="break-all text-indigo-600 hover:underline"
          >
            {campaign.trackingLink}
          </a>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Destination URL
          </p>

          <a
            href={campaign.destinationUrl}
            target="_blank"
            rel="noreferrer"
            className="break-all hover:underline"
          >
            {campaign.destinationUrl}
          </a>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Created
          </p>

          <p>
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