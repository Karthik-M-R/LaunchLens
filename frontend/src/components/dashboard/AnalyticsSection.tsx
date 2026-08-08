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
    <div className={`rounded-lg border border-[#243342] bg-[#111923] p-5 sm:p-6 ${className}`.trim()}>
      <h2 className="mb-6 text-xs font-semibold tracking-wider text-[#94A3B8] uppercase">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default AnalyticsSection;
