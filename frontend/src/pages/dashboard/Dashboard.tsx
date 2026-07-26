import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentProjects from "../../components/dashboard/RecentProjects";
import RecentActivity from "../../components/dashboard/RecentActivity";

const Dashboard = () => {

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

            projects={0}

            campaigns={0}

            clicks={0}

          />

          <div

            className="grid gap-8 lg:grid-cols-2"

          >

            <RecentProjects

              projects={[]}

            />

            <RecentActivity

              activities={[]}

            />

          </div>

        </div>

      </main>

    </div>

  );

};

export default Dashboard;