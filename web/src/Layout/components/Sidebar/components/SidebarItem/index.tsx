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
          "group relative flex flex-col items-center",
          "px-3 py-2 mx-1 rounded-xl",
          "md:gap-2 md:px-4 md:py-3 md:mx-3 md:rounded-2xl",
          "transition-all duration-300 ease-in-out",

          isActive && "bg-primary-light",
          !isActive && "hover:bg-gray-100",
        )
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            size={20}
            weight="regular"
            className={twHelper(
              "md:size-6!",
              "transition-all duration-300 ease-out",
              "group-hover:scale-110 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5",
              isActive ? "text-primary-dark" : "text-neutral-medium",
            )}
          />
          <span
            className={twHelper(
              "hidden md:block",
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
