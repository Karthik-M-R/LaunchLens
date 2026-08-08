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
}

const AnalyticsBarChart = ({
  title,
  data,
  xKey,
}: Props) => {
  return (
    <AnalyticsSection title={title}>
      {!data || data.length === 0 ? (
        <EmptyAnalyticsState title={title} />
      ) : (
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243342" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: '#16222E', opacity: 0.4 }} />
              <Bar
                dataKey="count"
                fill="#38BDF8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsSection>
  );
};

export default AnalyticsBarChart;
