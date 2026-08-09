import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import AnalyticsSection from "./AnalyticsSection";
import EmptyAnalyticsState from "./EmptyAnalyticsState";
import { formatDate } from "../../utils/dateUtils";

interface Props {
  data: {
    date: string;
    clicks: number;
  }[];
}

const TimelineChart = ({
  data,
}: Props) => {
  const formattedData = data?.map(item => ({
    ...item,
    date: formatDate(item.date)
  })) || [];

  return (
    <AnalyticsSection title="Click Timeline" className="mt-8">
      {!formattedData || formattedData.length === 0 ? (
        <EmptyAnalyticsState title="Click Timeline" />
      ) : (
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer>
            <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorClicks)"
                activeDot={{ r: 6, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsSection>
  );
};

export default TimelineChart;
