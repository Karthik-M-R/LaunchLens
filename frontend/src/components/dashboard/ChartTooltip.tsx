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

  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-white p-3 shadow-lg">

      {label && (
        <p className="font-semibold">
          {label}
        </p>
      )}

      <p className="text-indigo-600">
        {payload[0].value} Clicks
      </p>

    </div>
  );
};

export default ChartTooltip;