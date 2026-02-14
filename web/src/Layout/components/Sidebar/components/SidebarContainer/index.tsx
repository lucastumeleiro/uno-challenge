import type { ReactNode } from "react";

function SidebarContainer({ children }: { children: ReactNode }) {
  return <nav className="flex w-full flex-row justify-around md:flex-col md:gap-6 md:flex-1 md:justify-center">{children}</nav>;
}

export { SidebarContainer };
