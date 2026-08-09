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
    <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="absolute top-0 left-0 h-1 w-full bg-teal-500" />
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
          {title}
        </h3>
        <div className="rounded-lg bg-teal-50 p-2 text-teal-600">
          <Icon size={18} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {value.toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
