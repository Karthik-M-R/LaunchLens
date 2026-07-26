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
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

      <h2 className="text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
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