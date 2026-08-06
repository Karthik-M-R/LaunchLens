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
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const DeviceChart = ({
  data,
}: Props) => {

  return (

    <AnalyticsSection title="Devices">

      {!data || data.length === 0 ? (
        <EmptyAnalyticsState title="Devices" />
      ) : (
        <div className="h-80">

        <ResponsiveContainer>

          <PieChart>

            <Pie

              data={data}

              dataKey="count"

              nameKey="device"

              outerRadius={100}

              label

            >

              {data.map((_, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
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