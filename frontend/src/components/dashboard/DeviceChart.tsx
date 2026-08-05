import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">

        Devices

      </h2>

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

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default DeviceChart;