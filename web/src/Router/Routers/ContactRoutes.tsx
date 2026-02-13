import { Outlet } from "react-router-dom";
import { ContactForm } from "../../pages/contacts/Form";
import { Contacts } from "../../pages/contacts";

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
