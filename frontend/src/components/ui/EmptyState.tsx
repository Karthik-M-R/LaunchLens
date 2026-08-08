import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const EmptyState = ({
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="py-8">
      <h2 className="text-lg font-semibold text-[#F1F5F9]">
        {title}
      </h2>
      <p className="mt-2 text-sm text-[#94A3B8] max-w-md">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
