import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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
    <div className="mt-8 rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        Click Timeline
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#4F46E5"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default TimelineChart;