import {
  LayoutDashboardIcon,
  BriefcaseIcon,
} from "lucide-react";

export const DASHBOARD_SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Portofolio",
    href: "/dashboard/portofolio",
    icon: BriefcaseIcon,
  },
] as const;
