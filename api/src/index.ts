import { serve } from "@hono/node-server";
import { createServer } from "@infrastructure/api/server";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { seedContacts } from "@infrastructure/seeds/seed";

async function bootstrap() {
  const contactRepository = new InMemoryContactRepository();

  await seedContacts(contactRepository);

  const app = createServer(contactRepository);

  const port = 3000;

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📋 Health check: http://localhost:${port}/health`);
  console.log(`📞 Contacts API: http://localhost:${port}/contacts`);

  serve({
    fetch: app.fetch,
    port,
  });
}

bootstrap();
