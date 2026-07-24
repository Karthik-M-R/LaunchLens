import { Activity } from "lucide-react";

const EmptyActivity = () => {
  return (
    <div className="rounded-3xl border-4 border-dashed border-black bg-white p-12 text-center">

      <Activity
        size={60}
        className="mx-auto"
      />

      <h2 className="mt-6 text-2xl font-black">

        No Recent Activity

      </h2>

      <p className="mx-auto mt-4 max-w-sm font-medium text-gray-600">

        Your latest project and campaign
        activity will appear here.

      </p>

    </div>
  );
};

export default EmptyActivity;