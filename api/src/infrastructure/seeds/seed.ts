import { Contact } from "@domain/entities/Contact";
import { Lead } from "@domain/entities/Lead";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { InMemoryLeadRepository } from "@infrastructure/repositories/InMemoryLeadRepository";

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

export async function seedLeads(
  leadRepository: InMemoryLeadRepository,
  contactRepository: InMemoryContactRepository,
) {
  const contacts = await contactRepository.findAll();

  if (contacts.length < 4) {
    console.log("⚠️  Contatos insuficientes. Execute seedContacts primeiro.");
    return;
  }

  const contact1 = contacts[0]!;
  const contact2 = contacts[1]!;
  const contact3 = contacts[2]!;
  const contact4 = contacts[3]!;

  const leads = [
    Lead.create({
      contactId: contact1.id,
      name: "Lead Empresa ABC",
      company: "ABC Corporation",
      status: "novo",
    }),
    Lead.create({
      contactId: contact1.id,
      name: "Lead Projeto XYZ",
      company: "XYZ Solutions",
      status: "contactado",
    }),
    Lead.create({
      contactId: contact2.id,
      name: "Lead Sistema ERP",
      company: "TechCorp Sistemas",
      status: "qualificado",
    }),
    Lead.create({
      contactId: contact2.id,
      name: "Lead Website",
      company: "WebDesign Pro",
      status: "convertido",
    }),
    Lead.create({
      contactId: contact3.id,
      name: "Lead App Mobile",
      company: "MobileTech",
      status: "novo",
    }),
    Lead.create({
      contactId: contact3.id,
      name: "Lead Consultoria",
      company: "ConsultBiz",
      status: "perdido",
    }),
    Lead.create({
      contactId: contact4.id,
      name: "Lead E-commerce",
      company: "ShopOnline LTDA",
      status: "contactado",
    }),
  ];

  for (const lead of leads) {
    await leadRepository.save(lead);
  }

  console.log(`✅ ${leads.length} leads criados`);
}
