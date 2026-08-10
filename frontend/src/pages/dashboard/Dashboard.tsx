import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentProjects from "../../components/dashboard/RecentProjects";

import Loader from "../../components/ui/Loader";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { Target, Activity, Zap } from "lucide-react";

import { useDashboard } from "../../hooks/useDashboard";

const Dashboard = () => {

  const {

    dashboard,

    loading,

    error,

  } = useDashboard();

  if (loading) {

    return <Loader />;

  }

  if (error) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <h1 className="text-red-600">

          {error}

        </h1>

      </div>

    );

  }

  return (

    <DashboardShell
      title="Dashboard"
      subtitle="See what's driving your growth."
    >

      <div className="space-y-8 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">

          <StatsGrid

            projects={
              dashboard!.stats.projects
            }

            campaigns={
              dashboard!.stats.campaigns
            }

            clicks={
              dashboard!.stats.clicks
            }

          />

          {/* Tagline Section */}
          <div className="w-full relative overflow-hidden rounded-2xl border border-teal-100/60 bg-white shadow-[0_2px_12px_-4px_rgba(20,184,166,0.12)]">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-white pointer-events-none" />
            {/* Very subtle glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-teal-100/30 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative p-8 sm:p-10 flex flex-col items-start gap-8">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="shrink-0 relative">
                  <div className="absolute inset-0 bg-teal-400 blur-xl opacity-20 rounded-full" />
                  <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm border border-teal-50 relative z-10">
                    <Target className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2.5">
                    Track <span className="text-teal-600">smarter</span>. Grow <span className="text-teal-600">faster</span>.
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
                    LaunchLens helps you track every campaign, uncover what works, and turn data into better marketing decisions.
                  </p>
                </div>
              </div>
              
              <div className="w-full h-px bg-linear-to-r from-teal-100/60 to-transparent my-1" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-teal-50/80 flex items-center justify-center text-teal-600 ring-1 ring-inset ring-teal-500/10">
                     <Target className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Track</span>
                    <span className="text-xs font-medium text-slate-500">Monitor every click in real-time</span>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-teal-50/80 flex items-center justify-center text-teal-600 ring-1 ring-inset ring-teal-500/10">
                     <Activity className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Analyze</span>
                    <span className="text-xs font-medium text-slate-500">Understand your traffic and audience</span>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-teal-50/80 flex items-center justify-center text-teal-600 ring-1 ring-inset ring-teal-500/10">
                     <Zap className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Optimize</span>
                    <span className="text-xs font-medium text-slate-500">Improve performance and maximize ROI</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full">
            <RecentProjects projects={dashboard!.recentProjects} />
          </div>

      </div>

    </DashboardShell>

  );

};

export default Dashboard;