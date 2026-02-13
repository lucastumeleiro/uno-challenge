import { Link } from "react-router-dom";

function Contacts() {
  return (
    <div>
      <h1>Contatos</h1>
      <Link to="/contacts/form">Novo Contato</Link>
    </div>
  );
}

export { Contacts };
