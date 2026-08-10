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
    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-0.5 transition-all duration-300 group">
      <div className="absolute top-0 left-0 h-1 w-full bg-teal-500/60 group-hover:bg-teal-500 transition-colors duration-300" />
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
          {title}
        </h3>
        <div className="rounded-xl bg-teal-50/80 p-2.5 text-teal-600 ring-1 ring-inset ring-teal-500/10 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors duration-300">
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
      <div className="mt-6">
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          {value.toLocaleString()}
        </p>
        <p className="mt-1.5 text-sm font-medium text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
