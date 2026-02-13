import { Link } from "react-router-dom";

function Leads() {
  return (
    <div>
      <h1>Leads</h1>
      <Link to="/leads/form">Novo Lead</Link>
    </div>
  );
}

export { Leads };
