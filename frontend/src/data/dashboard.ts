import {
  FolderKanban,
  Megaphone,
  MousePointerClick,
  Users,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Projects",
    value: 0,
    icon: FolderKanban,
    color: "bg-cyan-100",
  },
  {
    title: "Campaigns",
    value: 0,
    icon: Megaphone,
    color: "bg-pink-100",
  },
  {
    title: "Total Clicks",
    value: 0,
    icon: MousePointerClick,
    color: "bg-yellow-100",
  },
  {
    title: "Visitors",
    value: 0,
    icon: Users,
    color: "bg-green-100",
  },
];