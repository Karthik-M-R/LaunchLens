import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
}: StatCardProps) => {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#243342] bg-[#111923] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-wider text-[#94A3B8] uppercase">
          {title}
        </h3>
        <Icon className="text-[#94A3B8]" size={16} />
      </div>
      <div className="mt-3">
        <p className="text-3xl font-bold tracking-tight text-[#F1F5F9]">
          {value.toLocaleString()}
        </p>
        <p className="mt-1 text-xs text-[#94A3B8]">
          {description}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-[#22D3C5]" />
    </div>
  );
};

export default StatCard;
