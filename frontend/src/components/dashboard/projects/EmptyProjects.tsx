import { FolderPlus } from "lucide-react";

type Props = {
  onCreate: () => void;
};

const EmptyProjects = ({ onCreate }: Props) => {
  return (
    <div className="rounded-3xl border-4 border-dashed border-black bg-white py-20 text-center">

      <FolderPlus
        size={70}
        className="mx-auto"
      />

      <h2 className="mt-6 text-3xl font-black">

        No Projects Yet

      </h2>

      <p className="mx-auto mt-4 max-w-md text-gray-600">

        Projects help you organize campaigns,
        tracking links and analytics for each product.

      </p>

      <button
        onClick={onCreate}
        className="mt-8 rounded-2xl border-4 border-black bg-indigo-500 px-8 py-4 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >

        Create Your First Project

      </button>

    </div>
  );
};

export default EmptyProjects;