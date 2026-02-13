import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>404 - Página não encontrada</h1>
      <Link to="/home">Voltar</Link>
    </div>
  );
}

export { NotFound };
