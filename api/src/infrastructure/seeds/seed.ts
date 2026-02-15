import { Contact } from "@domain/entities/Contact";
import { Lead } from "@domain/entities/Lead";
import type { LeadStatus } from "@domain/entities/Lead";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { InMemoryLeadRepository } from "@infrastructure/repositories/InMemoryLeadRepository";

export async function seedContacts(repository: InMemoryContactRepository) {
  const contacts = [
    Contact.create({ name: "João Silva", email: "joao.silva@example.com", phone: "(49) 99999-1111" }),
    Contact.create({ name: "Maria Santos", email: "maria.santos@example.com", phone: "(49) 99999-2222" }),
    Contact.create({ name: "Pedro Oliveira", email: "pedro.oliveira@example.com", phone: "(49) 99999-3333" }),
    Contact.create({ name: "Ana Costa", email: "ana.costa@example.com", phone: "(49) 99999-4444" }),
    Contact.create({ name: "Lucas Tumeleiro", email: "lucas.tumeleiro@gmail.com", phone: "(47) 93300-8369" }),
    Contact.create({ name: "Fernanda Lima", email: "fernanda.lima@example.com", phone: "(11) 98765-4321" }),
    Contact.create({ name: "Rafael Mendes", email: "rafael.mendes@example.com", phone: "(21) 97654-3210" }),
    Contact.create({ name: "Camila Rocha", email: "camila.rocha@example.com", phone: "(31) 96543-2109" }),
    Contact.create({ name: "Bruno Almeida", email: "bruno.almeida@example.com", phone: "(41) 95432-1098" }),
    Contact.create({ name: "Juliana Ferreira", email: "juliana.ferreira@example.com", phone: "(51) 94321-0987" }),
    Contact.create({ name: "Thiago Barbosa", email: "thiago.barbosa@example.com", phone: "(48) 93210-9876" }),
    Contact.create({ name: "Patrícia Nunes", email: "patricia.nunes@example.com", phone: "(19) 92109-8765" }),
    Contact.create({ name: "Diego Souza", email: "diego.souza@example.com", phone: "(27) 91098-7654" }),
    Contact.create({ name: "Larissa Martins", email: "larissa.martins@example.com", phone: "(85) 90987-6543" }),
    Contact.create({ name: "Gustavo Pereira", email: "gustavo.pereira@example.com", phone: "(62) 99876-5432" }),
    Contact.create({ name: "Isabela Cardoso", email: "isabela.cardoso@example.com", phone: "(71) 98765-4320" }),
    Contact.create({ name: "Marcelo Ribeiro", email: "marcelo.ribeiro@example.com", phone: "(81) 97654-3219" }),
    Contact.create({ name: "Tatiane Gomes", email: "tatiane.gomes@example.com", phone: "(91) 96543-2108" }),
    Contact.create({ name: "Felipe Araújo", email: "felipe.araujo@example.com", phone: "(65) 95432-1097" }),
    Contact.create({ name: "Renata Vieira", email: "renata.vieira@example.com", phone: "(67) 94321-0986" }),
    Contact.create({ name: "André Cavalcanti", email: "andre.cavalcanti@example.com", phone: "(84) 93210-8765" }),
    Contact.create({ name: "Bianca Teixeira", email: "bianca.teixeira@example.com", phone: "(82) 92109-7654" }),
    Contact.create({ name: "Carlos Eduardo Mota", email: "carlos.mota@example.com", phone: "(86) 91098-6543" }),
    Contact.create({ name: "Daniela Pinto", email: "daniela.pinto@example.com", phone: "(68) 90987-5432" }),
    Contact.create({ name: "Eduardo Fonseca", email: "eduardo.fonseca@example.com", phone: "(92) 99876-4321" }),
    Contact.create({ name: "Fabiana Lopes", email: "fabiana.lopes@example.com", phone: "(63) 98765-3210" }),
    Contact.create({ name: "Gabriel Moreira", email: "gabriel.moreira@example.com", phone: "(79) 97654-2109" }),
    Contact.create({ name: "Helena Duarte", email: "helena.duarte@example.com", phone: "(69) 96543-1098" }),
    Contact.create({ name: "Igor Nascimento", email: "igor.nascimento@example.com", phone: "(96) 95432-0987" }),
    Contact.create({ name: "Jéssica Campos", email: "jessica.campos@example.com", phone: "(95) 94321-9876" }),
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

  if (contacts.length < 30) {
    console.log("⚠️  Contatos insuficientes. Execute seedContacts primeiro.");
    return;
  }

  const statuses: LeadStatus[] = ["novo", "contactado", "qualificado", "convertido", "perdido"];

  const leadData: { contactIndex: number; name: string; company: string; status: LeadStatus }[] = [
    { contactIndex: 0, name: "Lead Empresa ABC", company: "ABC Corporation", status: "novo" },
    { contactIndex: 0, name: "Lead Projeto XYZ", company: "XYZ Solutions", status: "contactado" },
    { contactIndex: 1, name: "Lead Sistema ERP", company: "TechCorp Sistemas", status: "qualificado" },
    { contactIndex: 1, name: "Lead Website", company: "WebDesign Pro", status: "convertido" },
    { contactIndex: 2, name: "Lead App Mobile", company: "MobileTech", status: "novo" },
    { contactIndex: 2, name: "Lead Consultoria", company: "ConsultBiz", status: "perdido" },
    { contactIndex: 3, name: "Lead E-commerce", company: "ShopOnline LTDA", status: "contactado" },
    { contactIndex: 4, name: "Lead Plataforma SaaS", company: "CloudTech", status: "qualificado" },
    { contactIndex: 4, name: "Lead Migração Cloud", company: "SkyHost", status: "novo" },
    { contactIndex: 5, name: "Lead Automação", company: "AutomateNow", status: "contactado" },
    { contactIndex: 5, name: "Lead BI Dashboard", company: "DataViz Corp", status: "qualificado" },
    { contactIndex: 6, name: "Lead Integração API", company: "ConnectHub", status: "convertido" },
    { contactIndex: 7, name: "Lead Redesign UI", company: "PixelPerfect", status: "novo" },
    { contactIndex: 7, name: "Lead Portal RH", company: "PeopleFirst", status: "contactado" },
    { contactIndex: 8, name: "Lead CRM Custom", company: "SalesForce Pro", status: "qualificado" },
    { contactIndex: 8, name: "Lead Chatbot IA", company: "BotSmart", status: "perdido" },
    { contactIndex: 9, name: "Lead Marketplace", company: "TradeOn", status: "novo" },
    { contactIndex: 10, name: "Lead Gestão Estoque", company: "StockMaster", status: "contactado" },
    { contactIndex: 10, name: "Lead Logística", company: "FastDelivery", status: "convertido" },
    { contactIndex: 11, name: "Lead Fintech App", company: "PayEasy", status: "qualificado" },
    { contactIndex: 12, name: "Lead E-learning", company: "EduTech Plus", status: "novo" },
    { contactIndex: 12, name: "Lead Gamificação", company: "GameLearn", status: "contactado" },
    { contactIndex: 13, name: "Lead Telemedicina", company: "HealthConnect", status: "convertido" },
    { contactIndex: 14, name: "Lead IoT Industrial", company: "SmartFactory", status: "qualificado" },
    { contactIndex: 14, name: "Lead Segurança", company: "SecureNet", status: "perdido" },
    { contactIndex: 15, name: "Lead Analytics", company: "InsightData", status: "novo" },
    { contactIndex: 16, name: "Lead Social Media", company: "BuzzDigital", status: "contactado" },
    { contactIndex: 17, name: "Lead DevOps", company: "PipelineCI", status: "qualificado" },
    { contactIndex: 18, name: "Lead Blockchain", company: "ChainTrust", status: "convertido" },
    { contactIndex: 19, name: "Lead Machine Learning", company: "NeuralWorks", status: "novo" },
    { contactIndex: 20, name: "Lead Energia Solar", company: "SunPower Brasil", status: "novo" },
    { contactIndex: 20, name: "Lead Sustentabilidade", company: "GreenTech Solutions", status: "contactado" },
    { contactIndex: 21, name: "Lead Agronegócio", company: "AgroSmart", status: "qualificado" },
    { contactIndex: 22, name: "Lead Delivery App", company: "EntregaJá", status: "convertido" },
    { contactIndex: 23, name: "Lead Imobiliária", company: "CasaNova Digital", status: "perdido" },
    { contactIndex: 24, name: "Lead Contabilidade", company: "ContaFácil", status: "novo" },
    { contactIndex: 25, name: "Lead Pet Shop", company: "PetVida Online", status: "contactado" },
    { contactIndex: 26, name: "Lead Fitness App", company: "FitTrack", status: "qualificado" },
    { contactIndex: 27, name: "Lead Turismo", company: "ViagemCerta", status: "convertido" },
    { contactIndex: 28, name: "Lead Seguro Digital", company: "ProtegeTech", status: "novo" },
  ];

  const leads = leadData.map((data) =>
    Lead.create({
      contactId: contacts[data.contactIndex]!.id,
      name: data.name,
      company: data.company,
      status: data.status,
    }),
  );

  for (const lead of leads) {
    await leadRepository.save(lead);
  }

  console.log(`✅ ${leads.length} leads criados`);
}
