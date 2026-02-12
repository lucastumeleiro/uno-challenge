import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createContactsController } from "@infrastructure/api/controllers/contacts";
import { errorHandler } from "@infrastructure/api/middlewares/errorHandler";
import type { IContactRepository } from "@domain/repositories/IContactRepository";

export function createServer(contactRepository: IContactRepository) {
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

  app.route("/contacts", createContactsController(contactRepository));

  return app;
}
