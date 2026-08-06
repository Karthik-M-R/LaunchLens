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

    <div className={`rounded-2xl bg-white p-6 shadow ${className}`.trim()}>

      <h2 className="mb-6 text-xl font-semibold">
        {title}
      </h2>

      {children}

    </div>

  );

};

export default AnalyticsSection;