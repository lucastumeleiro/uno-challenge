import { Contacts } from "@pages/Contacts";
import { ContactForm } from "@pages/Contacts/Form";
import { Outlet } from "react-router-dom";

const ContactRoutes = [
  {
    path: `/Contacts`,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Contacts />,
      },
      {
        path: "form",
        element: <ContactForm />,
      },
      {
        path: "form/:id",
        element: <ContactForm />,
      },
    ],
  },
];

export { ContactRoutes };
