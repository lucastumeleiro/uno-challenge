import { Contact } from "@domain/entities/Contact";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";

export async function seedContacts(repository: InMemoryContactRepository) {
  const contacts = [
    Contact.create({
      name: "João Silva",
      email: "joao.silva@example.com",
      phone: "(49) 99999-1111",
    }),
    Contact.create({
      name: "Maria Santos",
      email: "maria.santos@example.com",
      phone: "(49) 99999-2222",
    }),
    Contact.create({
      name: "Pedro Oliveira",
      email: "pedro.oliveira@example.com",
      phone: "(49) 99999-3333",
    }),
    Contact.create({
      name: "Ana Costa",
      email: "ana.costa@example.com",
      phone: "(49) 99999-4444",
    }),
  ];

  for (const contact of contacts) {
    await repository.save(contact);
  }

  console.log(`✅ ${contacts.length} contacts criados`);
}
