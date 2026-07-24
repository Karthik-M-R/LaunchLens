import { FolderPlus } from "lucide-react";

const EmptyProjects = () => {
  return (
    <div className="rounded-3xl border-4 border-dashed border-black bg-white p-12 text-center">

      <FolderPlus
        size={60}
        className="mx-auto"
      />

      <h2 className="mt-6 text-2xl font-black">

        No Projects Yet

      </h2>

      <p className="mx-auto mt-4 max-w-sm font-medium text-gray-600">

        Create your first project to start tracking
        marketing campaigns.

      </p>

      <button className="mt-8 rounded-2xl border-4 border-black bg-indigo-500 px-8 py-3 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

        Create Project

      </button>

    </div>
  );
};

export default EmptyProjects;