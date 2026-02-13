import { hc } from "hono/client";
import { toast } from "react-toastify";
import type { AppType } from "@uno/api/infrastructure/api/server";

/**
 * Cliente Hono com type-safety e tratamento centralizado de erros
 *
 * @example
 * // Uso direto do client (type-safe)
 * const response = await api.client.contacts.$get()
 * const data = await response.json()
 *
 * @example
 * // Com tratamento de erro automático
 * const data = await api.handleResponse(
 *   api.client.contacts.$post({ json: { name: 'João', email: 'joao@email.com' } })
 * )
 *
 * @example
 * // Buscar lead específico
 * const response = await api.client.leads[':id'].$get({ param: { id: '123' } })
 * const lead = await response.json()
 */

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type ErrorResponse = {
  error: string;
  message?: string;
  details?: unknown;
};

async function handleResponse<T>(
  responsePromise: Promise<Response>,
): Promise<T> {
  try {
    const response = await responsePromise;

    if (!response.ok) {
      const errorData = (await response.json()) as ErrorResponse;
      const errorMessage =
        errorData.message || errorData.error || "Erro desconhecido";

      toast.error(errorMessage);

      throw new Error(errorMessage);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw error;
    }

    toast.error("Erro ao processar requisição");

    throw new Error("Erro ao processar requisição");
  }
}

export const client = hc<AppType>(baseURL);

export { handleResponse };

export const api = {
  client,
  handleResponse,
};

export type { AppType };
