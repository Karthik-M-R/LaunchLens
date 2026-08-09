import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

const AnalyticsSection = ({
  title,
  children,
  className = "",
}: Props) => {
  return (
    <div className={`rounded-2xl border border-slate-100 bg-white/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${className}`.trim()}>
      <h2 className="mb-6 text-sm font-semibold tracking-wide text-slate-700">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default AnalyticsSection;
