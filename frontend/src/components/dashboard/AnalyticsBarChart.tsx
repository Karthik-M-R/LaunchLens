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
        <div className="h-80">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey={xKey}/>

            <YAxis/>

            <Tooltip content={<ChartTooltip />} />

            <Bar
              dataKey="count"
              fill="#4F46E5"
            />

          </BarChart>

        </ResponsiveContainer>

        </div>
      )}

    </AnalyticsSection>

  );

};

export default AnalyticsBarChart;