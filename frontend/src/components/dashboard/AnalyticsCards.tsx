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
}: Props) => {
  return (
    <div className="mt-8 border border-slate-200 bg-white rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 sm:divide-x sm:divide-slate-200">
        
        <div className="px-4">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Total Clicks</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{summary.totalClicks.toLocaleString()}</p>
          <p className="mt-1 text-sm font-medium text-teal-600">tracked interactions</p>
        </div>

        <div className="px-4 sm:border-l sm:border-slate-200">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Unique Visitors</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{summary.uniqueVisitors.toLocaleString()}</p>
          <p className="mt-1 text-sm font-medium text-teal-600">distinct visitors</p>
        </div>

        <div className="px-4 sm:border-l sm:border-slate-200 xl:border-slate-200">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Device Types</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{devices.length.toLocaleString()}</p>
          <p className="mt-1 text-sm font-medium text-teal-600">different categories</p>
        </div>

        

      </div>
    </div>
  );
};

export default AnalyticsCards;
