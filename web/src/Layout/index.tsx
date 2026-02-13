import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

function Layout() {
  return (
    <div className="flex h-screen w-screen bg-primary-lighter">
      <Sidebar />

      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}

export { Layout };
