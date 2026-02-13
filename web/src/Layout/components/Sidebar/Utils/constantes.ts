import {
  AddressBookIcon,
  ChartLineIcon,
  HouseIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import type { SidebarItem } from "../Types";

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Home",
    path: "/home",
    icon: HouseIcon,
  },
  {
    label: "Contatos",
    path: "/contacts",
    icon: AddressBookIcon,
  },
  {
    label: "Leads",
    path: "/leads",
    icon: UsersIcon,
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: ChartLineIcon,
  },
];

export { SIDEBAR_ITEMS };
