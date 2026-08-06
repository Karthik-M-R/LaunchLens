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
        <div className="h-80">

        <ResponsiveContainer>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip content={<ChartTooltip />} />

            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#4F46E5"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

        </div>
      )}

    </AnalyticsSection>
  );
};

export default TimelineChart;