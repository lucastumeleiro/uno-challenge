import { Contact } from "@domain/entities/Contact";
import { Lead, LeadStatus } from "@domain/entities/Lead";
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
      status: LeadStatus.NOVO,
    }),
    Lead.create({
      contactId: contact1.id,
      name: "Lead Projeto XYZ",
      company: "XYZ Solutions",
      status: LeadStatus.CONTACTADO,
    }),
    Lead.create({
      contactId: contact2.id,
      name: "Lead Sistema ERP",
      company: "TechCorp Sistemas",
      status: LeadStatus.QUALIFICADO,
    }),
    Lead.create({
      contactId: contact2.id,
      name: "Lead Website",
      company: "WebDesign Pro",
      status: LeadStatus.CONVERTIDO,
    }),
    Lead.create({
      contactId: contact3.id,
      name: "Lead App Mobile",
      company: "MobileTech",
      status: LeadStatus.NOVO,
    }),
    Lead.create({
      contactId: contact3.id,
      name: "Lead Consultoria",
      company: "ConsultBiz",
      status: LeadStatus.PERDIDO,
    }),
    Lead.create({
      contactId: contact4.id,
      name: "Lead E-commerce",
      company: "ShopOnline LTDA",
      status: LeadStatus.CONTACTADO,
    }),
  ];

  for (const lead of leads) {
    await leadRepository.save(lead);
  }

  console.log(`✅ ${leads.length} leads criados`);
}
