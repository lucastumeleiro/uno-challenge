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
  const app = new Hono()
    .use("*", logger())
    .use("*", cors())
    .onError(errorHandler)
    .get("/health", (context) => {
      return context.json({
        status: "✅ API is running!",
        timestamp: new Date().toISOString(),
      });
    })
    .route(
      "/contacts",
      createContactsController(contactRepository, leadRepository),
    )
    .route(
      "/contacts",
      createContactLeadsController(leadRepository, contactRepository),
    )
    .route("/leads", createLeadsController(leadRepository, contactRepository));

  return app;
}

export type AppType = ReturnType<typeof createServer>;
