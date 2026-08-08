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
    <div className="rounded-lg border border-[#243342] bg-[#16222E] p-3 shadow-xl">
      {label && (
        <p className="font-semibold text-[#F1F5F9] mb-1 text-sm">
          {label}
        </p>
      )}
      <p className="text-sm font-medium text-[#22D3C5]">
        {payload[0].value} {payload[0].name === "clicks" || payload[0].name === "count" ? "Clicks" : ""}
      </p>
    </div>
  );
};

export default ChartTooltip;
