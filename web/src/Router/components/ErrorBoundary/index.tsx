import { useState } from "react";
import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError() as Error;
  const [showError, setShowError] = useState(false);

  console.error("error:", error);

  const handleToggle = () => {
    setShowError(!showError);
  };

  return (
    <div>
      <h1>Oops, algo deu errado</h1>
      <p>Parece que encontramos um pequeno contratempo.</p>
      <p>Pedimos desculpas pelo inconveniente.</p>

      <button onClick={handleToggle}>
        {showError ? "Ocultar detalhes" : "Saiba mais"}
      </button>

      {showError && (
        <div>
          {error && typeof error === "object" ? (
            <>
              {error.message && (
                <>
                  <strong>Mensagem:</strong>
                  <pre>{error.message}</pre>
                </>
              )}
              {error.stack && (
                <>
                  <strong>Stack trace:</strong>
                  <pre>{error.stack}</pre>
                </>
              )}
            </>
          ) : (
            <pre>
              {typeof error === "string"
                ? error
                : JSON.stringify(error, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

export { ErrorBoundary };
