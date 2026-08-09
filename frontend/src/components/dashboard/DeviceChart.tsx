import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import AnalyticsSection from "./AnalyticsSection";
import EmptyAnalyticsState from "./EmptyAnalyticsState";

interface Props {
  data: {
    device: string;
    count: number;
  }[];
}

const COLORS = [
  "#6366f1", // Indigo
  "#ec4899", // Pink
  "#14b8a6", // Teal
  "#f59e0b", // Amber
  "#8b5cf6"  // Violet
];

const DeviceChart = ({
  data,
}: Props) => {
  return (
    <AnalyticsSection title="Devices">
      {!data || data.length === 0 ? (
        <EmptyAnalyticsState title="Devices" />
      ) : (
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="device"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                stroke="none"
                cornerRadius={4}
                label={{ fill: "#64748b", fontSize: 12 }}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsSection>
  );
};

export default DeviceChart;
