import type { ReactNode } from "react";

function SidebarContainer({ children }: { children: ReactNode }) {
  return <nav className="flex w-full flex-col gap-6 flex-1 justify-center">{children}</nav>;
}

export { SidebarContainer };
