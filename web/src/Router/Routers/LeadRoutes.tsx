import { Leads } from "@pages/Leads";
import { LeadForm } from "@pages/Leads/Form";
import { Outlet } from "react-router-dom";

const LeadRoutes = [
  {
    path: `/leads`,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Leads />,
      },
      {
        path: "form",
        element: <LeadForm />,
      },
      {
        path: "form/:id",
        element: <LeadForm />,
      },
    ],
  },
];

export { LeadRoutes };
