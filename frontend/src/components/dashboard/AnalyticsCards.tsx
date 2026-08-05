interface Props {
  summary: {
    totalClicks: number;
    uniqueVisitors: number;
    lastClick: string | null;
  };

  devices: {
    device: string;
    count: number;
  }[];

  countries: {
    country: string;
    count: number;
  }[];
}

const Card = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (

  <div className="rounded-xl bg-white p-6 shadow">

    <p className="text-sm text-gray-500">
      {title}
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      {value}
    </h2>

  </div>

);

const AnalyticsCards = ({
  summary,
  devices,
  countries,
}: Props) => {

  return (

    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <Card
        title="Total Clicks"
        value={summary.totalClicks}
      />

      <Card
        title="Unique Visitors"
        value={summary.uniqueVisitors}
      />

      <Card
        title="Device Types"
        value={devices.length}
      />

      <Card
        title="Countries"
        value={countries.length}
      />

    </div>

  );

};

export default AnalyticsCards;