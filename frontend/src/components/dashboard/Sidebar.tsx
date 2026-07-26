import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `
      flex
      items-center
      gap-3
      rounded-xl
      px-4
      py-3
      text-sm
      font-medium
      transition
      ${
        isActive
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-600 hover:bg-gray-100"
      }
    `;

  return (
    <aside
      className="
        w-full
        border-b
        border-gray-200
        bg-white

        md:min-h-screen
        md:w-64
        md:border-b-0
        md:border-r
      "
    >
      <div className="border-b border-gray-200 p-6">

        <h1 className="text-2xl font-bold text-gray-900">

          LaunchLens

        </h1>

        <p className="mt-1 text-sm text-gray-500">

          Marketing Attribution

        </p>

      </div>

      <nav className="space-y-2 p-4">

        <NavLink
          to="/dashboard"
          className={navClass}
        >
          <LayoutDashboard size={18} />

          Dashboard

        </NavLink>

        <NavLink
          to="/projects"
          className={navClass}
        >
          <FolderKanban size={18} />

          Projects

        </NavLink>

      </nav>

      <div className="border-t border-gray-200 p-4">

        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            text-red-600
            transition
            hover:bg-red-50
          "
        >
          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;