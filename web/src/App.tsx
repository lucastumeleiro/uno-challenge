import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./Router";

function App() {
  return (
    <>
      <ToastContainer limit={5} />
      <RouterProvider router={router} />
    </>
  );
}

export { App };
