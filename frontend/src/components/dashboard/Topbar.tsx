import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

const Topbar = () => {
  // Temporary mock user
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

          {greeting},{" "}

          <span className="text-indigo-500">

            {user.name}

          </span>

          👋

        </h1>

        <p className="mt-2 font-semibold text-gray-600">

          Here's what's happening with your campaigns today.

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="flex items-center gap-3 rounded-2xl border-4 border-black bg-amber-50 px-5 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search..."
            className="w-44 bg-transparent font-semibold outline-none"
          />

        </div>

        {/* Notification */}

        <button className="rounded-2xl border-4 border-black bg-yellow-300 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1">

          <Bell />

        </button>

        {/* Profile */}

        <button className="flex items-center gap-3 rounded-2xl border-4 border-black bg-cyan-300 px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1">

          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white font-black">

            K

          </div>

          <ChevronDown />

        </button>

      </div>

    </header>
  );
};

export default Topbar;