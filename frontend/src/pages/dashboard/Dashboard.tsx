import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentProjects from "../../components/dashboard/RecentProjects";

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

            <div className="flex flex-col justify-center items-center p-8 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg border border-indigo-100 dark:border-gray-700 shadow-sm text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Know which campaigns actually drive traffic.
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                Track every campaign. Understand your traffic. Make better marketing decisions with LaunchLens.
              </p>
            </div>

          </div>

      </div>

    </DashboardShell>

  );

};

export default Dashboard;