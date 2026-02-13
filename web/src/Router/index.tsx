import { createBrowserRouter, Outlet } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LeadRoutes } from "./Routers/LeadRoutes";
import { ContactRoutes } from "./Routers/ContactRoutes";
import { Home } from "../pages/home";
import { Dashboard } from "../pages/dashboard";
import { Layout } from "../Layout";
import { NotFound } from "./components/NotFound";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Outlet />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          ...ContactRoutes,
          ...LeadRoutes,
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
