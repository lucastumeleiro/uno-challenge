import { NavLink } from "react-router-dom";
import type { ISidebarItemProps } from "../../Types";
import { twHelper } from "@Lib/twHelper";

function SidebarItem({ item }: ISidebarItemProps) {
  return (
    <NavLink
      to={item.path}
      aria-label={item.label}
      className={({ isActive }) =>
        twHelper(
          "group relative flex flex-col items-center gap-2",
          "px-4 py-3 mx-3 rounded-2xl",
          "transition-all duration-300 ease-in-out",

          isActive && "bg-primary-light",
          !isActive && "hover:bg-gray-100",
        )
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            size={24}
            weight="regular"
            className={twHelper(
              "transition-all duration-300 ease-out",
              "group-hover:scale-110 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5",
              isActive ? "text-primary-dark" : "text-neutral-medium",
            )}
          />
          <span
            className={twHelper(
              "text-xs transition-colors duration-300 ease-in-out",
              isActive && "text-primary-dark font-bold",
              !isActive && "text-neutral-medium",
            )}
          >
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );
}

export { SidebarItem };
