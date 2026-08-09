import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import AnalyticsSection from "./AnalyticsSection";
import EmptyAnalyticsState from "./EmptyAnalyticsState";

interface Props {
  title: string;
  data: any[];
  xKey: string;
  gradientStart?: string;
  gradientEnd?: string;
}

const AnalyticsBarChart = ({
  title,
  data,
  xKey,
  gradientStart = "#3b82f6",
  gradientEnd = "#2563eb",
}: Props) => {
  const gradientId = `colorBar-${xKey}`;

  return (
    <AnalyticsSection title={title}>
      {!data || data.length === 0 ? (
        <EmptyAnalyticsState title={title} />
      ) : (
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gradientStart} stopOpacity={0.9}/>
                  <stop offset="95%" stopColor={gradientEnd} stopOpacity={0.7}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Bar
                dataKey="count"
                fill={`url(#${gradientId})`}
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsSection>
  );
};

export default AnalyticsBarChart;
