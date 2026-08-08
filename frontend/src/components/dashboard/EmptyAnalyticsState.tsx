interface Props {
  title: string;
}

const EmptyAnalyticsState = ({
  title,
}: Props) => {
  return (
    <div className="flex h-80 items-center justify-center p-6 text-center">
      <p className="text-sm text-[#94A3B8]">
        No {title.toLowerCase()} data yet.
      </p>
    </div>
  );
};

export default EmptyAnalyticsState;
