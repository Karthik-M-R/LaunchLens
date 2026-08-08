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
  "#22D3C5",
  "#38BDF8",
  "#4ADE80",
  "#FB7185",
  "#94A3B8"
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
                outerRadius={100}
                stroke="#111923"
                strokeWidth={2}
                label={{ fill: "#94A3B8", fontSize: 12 }}
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
