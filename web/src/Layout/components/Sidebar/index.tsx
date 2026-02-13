import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="">
      <nav className="flex flex-col">
        <Link to="/home">Home</Link>
        <Link to="/contacts">Contatos</Link>
        <Link to="/leads">Leads</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </aside>
  );
}

export { Sidebar };
