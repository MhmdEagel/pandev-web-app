import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  SettingsIcon,
  HelpCircleIcon,
  UsersIcon,
  ShieldIcon,
} from "lucide-react";

export const SIDEBAR_MAIN_ITEMS = [
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
];

export const SIDEBAR_SECONDARY_ITEMS = [
  {
    title: "Pengaturan",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
  {
    title: "Bantuan",
    href: "/dashboard/help",
    icon: HelpCircleIcon,
  },
];

export const SIDEBAR_ADMIN_ITEMS = [
  {
    title: "Manajemen User",
    href: "/dashboard/user-management",
    icon: UsersIcon,
  },
];
