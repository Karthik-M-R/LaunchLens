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
  
}

const AnalyticsCards = ({
  summary,
  devices,
  countries,
}: Props) => {
  return (
    <div className="mt-8 border border-[#243342] bg-[#111923] rounded-lg p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 sm:divide-x sm:divide-[#243342]">
        
        <div className="px-4">
          <p className="text-xs font-semibold tracking-wider text-[#94A3B8] uppercase">Total Clicks</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#F1F5F9]">{summary.totalClicks}</p>
          <p className="mt-1 text-sm text-[#38BDF8]">tracked interactions</p>
        </div>

        <div className="px-4 sm:border-l sm:border-[#243342]">
          <p className="text-xs font-semibold tracking-wider text-[#94A3B8] uppercase">Unique Visitors</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#F1F5F9]">{summary.uniqueVisitors}</p>
          <p className="mt-1 text-sm text-[#38BDF8]">distinct visitors</p>
        </div>

        <div className="px-4 xl:border-l xl:border-[#243342]">
          <p className="text-xs font-semibold tracking-wider text-[#94A3B8] uppercase">Device Types</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#F1F5F9]">{devices.length}</p>
          <p className="mt-1 text-sm text-[#94A3B8]">different categories</p>
        </div>

        

      </div>
    </div>
  );
};

export default AnalyticsCards;
