import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Coffee,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import logo from "../../../assets/logo/logo.png";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    path: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  return (
    <aside className="flex w-72 flex-col justify-between border-r-4 border-black bg-white">

      {/* Logo */}

      <div>

        <div className="flex items-center justify-center border-b-4 border-black px-6 py-8">

          <img
            src={logo}
            alt="LaunchLens"
            className="h-20 w-auto object-contain"
          />

        </div>

        {/* Navigation */}

        <nav className="mt-6 space-y-3 px-4">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl border-4 border-black px-5 py-4 font-black transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-400 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white hover:bg-yellow-100"
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

      <div className="space-y-5 border-t-4 border-black p-5">

        <a
          href="https://buymeacoffee.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl border-4 border-black bg-yellow-300 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1"
        >

          <div className="flex items-center gap-2">

            <Coffee />

            <span className="font-black">

              Buy Me a Coffee

            </span>

          </div>

          <p className="mt-3 text-sm font-semibold leading-6">

            If LaunchLens helped you,
            coffee's on you ☕

          </p>

        </a>

        <div className="rounded-2xl border-4 border-black bg-pink-100 p-5">

          <h3 className="font-black">

            Karthik

          </h3>

          <p className="text-sm text-gray-600">

            Indie Builder

          </p>

          <button className="mt-4 flex items-center gap-2 font-bold hover:text-red-600">

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;