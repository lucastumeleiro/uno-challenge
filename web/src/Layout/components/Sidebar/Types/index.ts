import { type Icon } from "@phosphor-icons/react";

export interface SidebarItem {
  label: string;
  path: string;
  icon: Icon;
}

export interface ISidebarItemProps {
  item: SidebarItem;
}
