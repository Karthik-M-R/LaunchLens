import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
};

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color,
}: Props) => {
  return (
    <div
      className={`${color} rounded-3xl border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]`}
    >
      <div className="flex items-center justify-between">
        <Icon size={34} />

        <span className="text-4xl font-black">

          {value}

        </span>
      </div>

      <p className="mt-5 text-lg font-bold">

        {title}

      </p>
    </div>
  );
};

export default StatsCard;