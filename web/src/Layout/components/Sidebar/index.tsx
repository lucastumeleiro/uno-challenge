import { SidebarLogo } from "./components/SidebarLogo";
import { SidebarContainer } from "./components/SidebarContainer";
import { SIDEBAR_ITEMS } from "./Utils/constantes";
import { SidebarItem } from "./components/SidebarItem";

function Sidebar() {
  return (
    <aside
      aria-label="Navegação principal"
      className="flex h-full w-32 flex-col items-center bg-white py-8 rounded-r-3xl border-r border-gray-200 z-10 shadow-sidebar"
    >
      <SidebarLogo />

      <SidebarContainer>
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}
      </SidebarContainer>
    </aside>
  );
}

export { Sidebar };
