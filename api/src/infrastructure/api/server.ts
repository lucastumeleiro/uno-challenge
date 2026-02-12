import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createContactsController } from "@infrastructure/api/controllers/contacts";
import {
  createLeadsController,
  createContactLeadsController,
} from "@infrastructure/api/controllers/leads";
import { errorHandler } from "@infrastructure/api/middlewares/errorHandler";
import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { ILeadRepository } from "@domain/repositories/ILeadRepository";

export function createServer(
  contactRepository: IContactRepository,
  leadRepository: ILeadRepository,
) {
  const app = new Hono();

  app.use("*", logger());
  app.use("*", cors());

  app.onError(errorHandler);

  app.get("/health", (context) => {
    return context.json({
      status: "✅ API is running!",
      timestamp: new Date().toISOString(),
    });
  });

  app.route(
    "/contacts",
    createContactsController(contactRepository, leadRepository),
  );
  app.route(
    "/contacts",
    createContactLeadsController(leadRepository, contactRepository),
  );
  app.route("/leads", createLeadsController(leadRepository, contactRepository));

  return app;
}
