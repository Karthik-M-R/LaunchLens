import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  FolderKanban,
  LogOut,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo/logo.png";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const Sidebar = ({
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `
      flex
      items-center
      gap-3
      px-4
      py-2.5
      text-sm
      font-medium
      transition-all
      duration-200
      ease-in-out
      relative
      ${
        isActive
          ? "text-[#F1F5F9] bg-[#111923]"
          : "text-[#94A3B8] hover:bg-[#111923] hover:text-[#F1F5F9]"
      }
    `;

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-[#080D14]/80 md:hidden"
          onClick={onCloseMobile}
          type="button"
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-40
          flex
          w-72
          flex-col
          border-r
          border-[#243342]
          bg-[#080D14]
          transition-transform
          duration-200
          ease-in-out
          md:static
          md:z-auto
          md:w-60
          md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between border-b border-[#243342] px-5 py-5 md:px-6">
          <Link
            to="/"
            className="flex items-center transition-transform duration-200 hover:scale-[1.02]"
            onClick={onCloseMobile}
          >
            <div className="rounded-xl bg-[#F8FAFC] px-4 py-2 shadow-sm">
              <img
                src={logo}
                alt="LaunchLens Logo"
                className="h-14 w-auto object-contain"
              />
            </div>
          </Link>

          <button
            aria-label="Close menu"
            className="rounded-lg p-2 text-[#94A3B8] transition-all duration-200 hover:bg-[#16222E] hover:text-[#F1F5F9] md:hidden"
            onClick={onCloseMobile}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <NavLink
            to="/dashboard"
            className={navClass}
            onClick={onCloseMobile}
          >
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#22D3C5] rounded-r-full" />}
                <LayoutDashboard size={18} className={isActive ? "text-[#22D3C5]" : ""} />
                Dashboard
              </>
            )}
          </NavLink>

          <NavLink
            to="/projects"
            className={navClass}
            onClick={onCloseMobile}
          >
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#22D3C5] rounded-r-full" />}
                <FolderKanban size={18} className={isActive ? "text-[#22D3C5]" : ""} />
                Projects
              </>
            )}
          </NavLink>
        </nav>

        <div className="mt-auto border-t border-[#243342] p-4 flex flex-col gap-2">
          
          <button
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-2.5
              text-sm
              font-medium
              text-[#FB7185]
              transition-all
              duration-200
              ease-in-out
              hover:bg-[#111923]
            "
            type="button"
          >
            <LogOut size={18} />
            Logout
          </button>

          <div className="relative mt-2 flex justify-center" ref={profileRef}>
             <button
              type="button"
              onClick={() => setProfileOpen((current) => !current)}
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[#16222E]
                border
                border-[#243342]
                font-semibold
                text-[#F1F5F9]
                transition-all
                duration-200
                ease-in-out
                hover:border-[#38BDF8]
                hover:bg-[#111923]
              "
            >
              {initials}
            </button>

            <div
              className={`
                pointer-events-none
                absolute
                left-14
                bottom-0
                w-52
                rounded-lg
                border
                border-[#243342]
                bg-[#16222E]
                p-3
                shadow-xl
                transition-all
                duration-200
                ease-in-out
                ${profileOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}
              `}
            >
              <p className="text-sm font-semibold text-[#F1F5F9]">
                {user?.name}
              </p>
              <p className="mt-0.5 truncate text-xs text-[#94A3B8]">
                {user?.email}
              </p>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;