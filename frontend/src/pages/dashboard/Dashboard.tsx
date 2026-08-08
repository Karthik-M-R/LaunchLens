import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentProjects from "../../components/dashboard/RecentProjects";
import RecentActivity from "../../components/dashboard/RecentActivity";

import Loader from "../../components/ui/Loader";
import DashboardShell from "../../components/dashboard/DashboardShell";

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

      <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">

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

          <div className="grid gap-6 lg:grid-cols-2">

            <RecentProjects

              projects={
                dashboard!.recentProjects
              }

            />

            <RecentActivity

              activities={
                dashboard!.recentActivity
              }

            />

          </div>

      </div>

    </DashboardShell>

  );

};

export default Dashboard;