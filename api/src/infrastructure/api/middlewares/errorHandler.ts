import type { Context } from "hono";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";
import { ContactEmailAlreadyExistsError } from "@application/exceptions/ContactEmailAlreadyExistsError";
import { ContactValidationError } from "@domain/exceptions/ContactValidationError";

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

  if (error instanceof ContactNotFoundError) {
    return context.json(
      {
        error: error.message,
      },
      404,
    );
  }

  if (error instanceof ContactEmailAlreadyExistsError) {
    return context.json(
      {
        error: error.message,
      },
      409,
    );
  }

  if (error instanceof ContactValidationError) {
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
