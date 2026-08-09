import { Menu } from "lucide-react";
import type { ReactNode } from "react";

interface TopbarProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
  onMenuClick?: () => void;
}

const Topbar = ({
  title,
  subtitle,
  action,
  onMenuClick,
}: TopbarProps) => {

  return (
    <header
      className="
        sticky
        top-0
        z-20
        border-b
        border-slate-200
        bg-white/90
        px-4
        py-4
        backdrop-blur-md
        sm:px-6
        lg:px-8
        flex
        items-center
        justify-between
        min-h-[64px]
      "
    >
      <div className="flex items-start justify-between gap-4 w-full">
        <div className="flex min-w-0 items-center gap-3">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="
                inline-flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                bg-white
                text-slate-500
                transition-all
                duration-200
                ease-in-out
                hover:border-slate-300
                hover:text-slate-700
                shadow-sm
                md:hidden
              "
              aria-label="Open navigation menu"
            >
              <Menu size={18} />
            </button>
          )}
          <div className="min-w-0 flex flex-col justify-center">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 sm:text-sm mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {action && (
            <div className="flex items-center">
              {action}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;