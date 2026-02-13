import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.svg";

function SidebarLogo() {
  return (
    <Link
      to="/home"
      aria-label="Ir para página inicial"
      className="flex items-center justify-center pt-2 transition-transform duration-200 hover:scale-105"
    >
      <img src={logo} alt="Logo Uno" className="h-12 w-12" />
    </Link>
  );
}

export { SidebarLogo };
