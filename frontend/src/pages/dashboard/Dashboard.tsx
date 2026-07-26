import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentProjects from "../../components/dashboard/RecentProjects";
import RecentActivity from "../../components/dashboard/RecentActivity";

import Loader from "../../components/ui/Loader";

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

    <div className="min-h-screen bg-gray-50 md:flex">

      <Sidebar />

      <main className="flex-1">

        <Topbar

          title="Dashboard"

          subtitle="Overview of your marketing workspace."

        />

        <div className="space-y-8 p-8">

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

          <div className="grid gap-8 lg:grid-cols-2">

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

      </main>

    </div>

  );

};

export default Dashboard;