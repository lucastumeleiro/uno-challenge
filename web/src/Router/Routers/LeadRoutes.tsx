import { Outlet } from "react-router-dom";
import { Leads } from "../../pages/leads";
import { LeadForm } from "../../pages/leads/Form";

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
