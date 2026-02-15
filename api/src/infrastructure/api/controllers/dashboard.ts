import { Hono } from "hono";
import { GetDashboard } from "@application/use-cases/dashboard/GetDashboard";
import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import type { IContactRepository } from "@domain/repositories/IContactRepository";

export function createDashboardController(
  leadRepository: ILeadRepository,
  contactRepository: IContactRepository,
) {
  const getDashboardUseCase = new GetDashboard(leadRepository, contactRepository);

  return new Hono().get("/", async (context) => {
    const dashboard = await getDashboardUseCase.execute();
    return context.json(dashboard);
  });
}
