import {
  FolderKanban,
  Megaphone,
  MousePointerClick,
} from "lucide-react";

import StatCard from "./StatCard";

interface StatsGridProps {
  projects: number;
  campaigns: number;
  clicks: number;
}

const StatsGrid = ({
  projects,
  campaigns,
  clicks,
}: StatsGridProps) => {
  return (

    <section
      className="
        grid
        gap-4

        md:grid-cols-2

        xl:grid-cols-3
      "
    >

      <StatCard
        title="Projects"
        value={projects}
        icon={FolderKanban}
        description="Your active marketing workspaces"
      />

      <StatCard
        title="Campaigns"
        value={campaigns}
        icon={Megaphone}
        description="Live campaigns under measurement"
      />

      <StatCard
        title="Total Clicks"
        value={clicks}
        icon={MousePointerClick}
        description="Combined tracked traffic"
      />

    </section>

  );
};

export default StatsGrid;