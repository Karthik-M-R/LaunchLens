import { useState, type ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardShellProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}

const DashboardShell = ({
  title,
  subtitle,
  action,
  children,
}: DashboardShellProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden md:flex bg-slate-50 text-slate-900">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <main className="min-w-0 flex-1 overflow-x-hidden">
        <Topbar
          title={title}
          subtitle={subtitle}
          action={action}
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        {children}
      </main>
    </div>
  );
};

export default DashboardShell;