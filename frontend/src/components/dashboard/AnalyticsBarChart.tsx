import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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

    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        {title}
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey={xKey}/>

            <YAxis/>

            <Tooltip/>

            <Bar
              dataKey="count"
              fill="#4F46E5"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default AnalyticsBarChart;