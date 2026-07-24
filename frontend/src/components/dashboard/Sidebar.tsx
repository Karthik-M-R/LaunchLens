import {
  LayoutDashboard,
  FolderKanban,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  Coffee,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import logo from "../../assets/logo/logo.png";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Projects",
    icon: FolderKanban,
    path: "/dashboard/projects",
  },
  {
    name: "Campaigns",
    icon: Megaphone,
    path: "/dashboard/campaigns",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/dashboard/analytics",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="flex w-72 flex-col justify-between border-r-4 border-black bg-white p-6">

      {/* Logo */}

      <div>

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="LaunchLens"
            className="h-12"
          />

          <div>

            <h1 className="text-2xl font-black">

              LaunchLens

            </h1>

            <p className="text-sm font-semibold text-gray-500">

              Marketing Attribution

            </p>

          </div>

        </div>

        {/* Navigation */}

        <nav className="mt-12 space-y-4">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl border-4 border-black px-5 py-4 font-black transition-all
                  
                  ${
                    isActive
                      ? "bg-indigo-400 text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white hover:bg-yellow-200"
                  }`
                }
              >

                <Icon size={22} />

                {item.name}

              </NavLink>

            );

          })}

        </nav>

      </div>

      {/* Bottom */}

      <div>

        {/* Coffee */}

        <a
          href="https://buymeacoffee.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-3xl border-4 border-black bg-yellow-300 p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1"
        >

          <div className="flex items-center gap-3">

            <Coffee />

            <span className="font-black">

              Buy Me a Coffee

            </span>

          </div>

          <p className="mt-4 text-sm font-bold leading-6">

            If LaunchLens saved your
            marketing budget,
            coffee's on you ❤️

          </p>

        </a>

        {/* User */}

        <div className="mt-8 rounded-2xl border-4 border-black bg-pink-200 p-5">

          <h3 className="font-black">

            Karthik

          </h3>

          <button className="mt-4 flex items-center gap-2 font-bold">

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;