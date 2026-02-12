import { serve } from "@hono/node-server";
import { createServer } from "@infrastructure/api/server";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { InMemoryLeadRepository } from "@infrastructure/repositories/InMemoryLeadRepository";
import { seedContacts, seedLeads } from "@infrastructure/seeds/seed";

async function bootstrap() {
  const contactRepository = new InMemoryContactRepository();
  const leadRepository = new InMemoryLeadRepository();

  await seedContacts(contactRepository);
  await seedLeads(leadRepository, contactRepository);

  const app = createServer(contactRepository, leadRepository);

  const port = 3000;

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📋 Health check: http://localhost:${port}/health`);
  console.log(`📞 Contacts API: http://localhost:${port}/contacts`);
  console.log(`🎯 Leads API: http://localhost:${port}/leads`);

  serve({
    fetch: app.fetch,
    port,
  });
}

bootstrap();
