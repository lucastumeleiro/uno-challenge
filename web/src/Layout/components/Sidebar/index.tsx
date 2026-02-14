import { SidebarLogo } from "./components/SidebarLogo";
import { SidebarContainer } from "./components/SidebarContainer";
import { SIDEBAR_ITEMS } from "./Utils/constantes";
import { SidebarItem } from "./components/SidebarItem";

function Sidebar() {
  return (
    <aside
      aria-label="Navegação principal"
      className="flex w-full h-16 flex-row items-center bg-white border-t border-gray-200 z-10 md:h-full md:w-32 md:flex-col md:py-8 md:rounded-r-3xl md:border-t-0 md:border-r md:shadow-sidebar"
    >
      <div className="hidden md:block">
        <SidebarLogo />
      </div>

      <SidebarContainer>
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}
      </SidebarContainer>
    </aside>
  );
}

export { Sidebar };
