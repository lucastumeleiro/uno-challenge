import type { Context } from "hono";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";
import { ContactEmailAlreadyExistsError } from "@application/exceptions/ContactEmailAlreadyExistsError";
import { ContactHasLeadsError } from "@application/exceptions/ContactHasLeadsError";
import { ContactValidationError } from "@domain/exceptions/ContactValidationError";
import { LeadNotFoundError } from "@application/exceptions/LeadNotFoundError";
import { LeadContactNotFoundError } from "@application/exceptions/LeadContactNotFoundError";
import { LeadValidationError } from "@domain/exceptions/LeadValidationError";

export function errorHandler(error: Error, context: Context) {
  console.error("Error:", error);

  if (error.name === "ZodError") {
    return context.json(
      {
        error: "Erro de validação",
        details: error.message,
      },
      400,
    );
  }

  if (
    error instanceof ContactNotFoundError ||
    error instanceof LeadNotFoundError
  ) {
    return context.json(
      {
        error: error.message,
      },
      404,
    );
  }

  if (
    error instanceof ContactEmailAlreadyExistsError ||
    error instanceof ContactHasLeadsError
  ) {
    return context.json(
      {
        error: error.message,
      },
      409,
    );
  }

  if (error instanceof LeadContactNotFoundError) {
    return context.json(
      {
        error: error.message,
      },
      404,
    );
  }

  if (
    error instanceof ContactValidationError ||
    error instanceof LeadValidationError
  ) {
    return context.json(
      {
        error: "Erro de validação",
        details: error.errors,
      },
      422,
    );
  }

  return context.json(
    {
      error: "Erro interno do servidor",
      message: error.message,
    },
    500,
  );
}
