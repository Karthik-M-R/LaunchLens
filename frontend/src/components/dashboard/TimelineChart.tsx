import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import AnalyticsSection from "./AnalyticsSection";
import EmptyAnalyticsState from "./EmptyAnalyticsState";

interface Props {
  data: {
    date: string;
    clicks: number;
  }[];
}

const TimelineChart = ({
  data,
}: Props) => {
  return (
    <AnalyticsSection title="Click Timeline" className="mt-8">
      {!data || data.length === 0 ? (
        <EmptyAnalyticsState title="Click Timeline" />
      ) : (
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243342" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#243342', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#22D3C5"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#22D3C5', stroke: '#111923', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsSection>
  );
};

export default TimelineChart;
