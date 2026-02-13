import { useState, useEffect, useTransition } from "react";
import { useContacts } from "@Hooks/useContacts";
import type { ContactDTO } from "@Hooks/useContacts/Types";

function Home() {
  const [contacts, setContacts] = useState<ContactDTO[]>([]);
  const [isPending, startTransition] = useTransition();
  const { getContacts, createContact, deleteContact } = useContacts();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  const handleCreateTest = () => {
    startTransition(async () => {
      const newContact = await createContact({
        name: "Teste Automático",
        email: `teste${Date.now()}@email.com`,
        phone: "(11) 99999-9999",
      });

      if (newContact) {
        setContacts((prev) => [...prev, newContact]);
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const success = await deleteContact(id);

      if (success) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home - Teste useContacts (React 19)</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleCreateTest}
          disabled={isPending}
          style={{
            padding: "10px 20px",
            backgroundColor: isPending ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isPending ? "not-allowed" : "pointer",
            opacity: isPending ? 0.6 : 1,
          }}
        >
          {isPending ? "Processando..." : "Criar Contato de Teste"}
        </button>
      </div>

      <h2>
        Contatos ({contacts.length})
        {isPending && (
          <span
            style={{ marginLeft: "10px", fontSize: "14px", color: "#6c757d" }}
          >
            ⏳ Atualizando...
          </span>
        )}
      </h2>

      {contacts.length === 0 ? (
        <p>Nenhum contato encontrado</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {contacts.map((contact) => (
            <li
              key={contact.id}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: isPending ? 0.7 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <div>
                <strong>{contact.name}</strong>
                <br />
                {contact.email} | {contact.phone}
                <br />
                <small>ID: {contact.id}</small>
              </div>
              <button
                onClick={() => handleDelete(contact.id)}
                disabled={isPending}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isPending ? "not-allowed" : "pointer",
                  opacity: isPending ? 0.5 : 1,
                }}
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { Home };
