import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

function Layout() {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen w-screen bg-primary-lighter overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto m-4 md:m-8">
        <Outlet />
      </main>
    </div>
  );
}

export { Layout };
