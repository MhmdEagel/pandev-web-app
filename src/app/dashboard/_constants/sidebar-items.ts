import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  TrophyIcon,
} from "lucide-react";

export const DASHBOARD_SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Portfolio",
    href: "/dashboard/portfolio",
    icon: BriefcaseIcon,
  },
  {
    title: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: TrophyIcon,
  },
] as const;
