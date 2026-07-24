import StatsCard from "../../components/dashboard/home/StatsCard";
import EmptyProjects from "../../components/dashboard/home/EmptyProjects";
import EmptyActivity from "../../components/dashboard/home/EmptyActivity";

import { dashboardStats } from "../../data/dashboard";

const Dashboard = () => {
  return (
    <div className="space-y-10">

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {dashboardStats.map((item) => (
          <StatsCard
            key={item.title}
            {...item}
          />
        ))}

      </div>

      {/* Bottom */}

      <div className="grid gap-8 lg:grid-cols-2">

        <EmptyProjects />

        <EmptyActivity />

      </div>

    </div>
  );
};

export default Dashboard;