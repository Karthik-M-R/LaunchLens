interface Props {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const ChartTooltip = ({
  active,
  payload,
  label,
}: Props) => {
  if (!active || !payload || !payload.length) {
    return null;
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
      {label && (
        <p className="font-semibold text-slate-900 mb-1 text-sm">
          {label}
        </p>
      )}
      <p className="text-sm font-medium text-teal-600">
        {payload[0].value} {payload[0].name === "clicks" || payload[0].name === "count" ? "Clicks" : ""}
      </p>
    </div>
  );
};

export default ChartTooltip;
