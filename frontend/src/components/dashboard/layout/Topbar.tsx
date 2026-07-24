import {
  Bell,
  Plus,
} from "lucide-react";

const Topbar = () => {

  const user = {
    name: "Karthik",
  };

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="flex items-center justify-between border-b-4 border-black bg-white px-8 py-6">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-black">

          {greeting},

          <span className="ml-2 text-indigo-500">

            {user.name}

          </span>

          👋

        </h1>

        <p className="mt-2 font-medium text-gray-600">

          Welcome back. Here's what's happening today.

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <button className="flex items-center gap-2 rounded-2xl border-4 border-black bg-indigo-500 px-6 py-3 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1">

          <Plus size={20} />

          New Project

        </button>

        <button className="rounded-2xl border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:bg-yellow-100">

          <Bell />

        </button>

      </div>

    </header>
  );
};

export default Topbar;