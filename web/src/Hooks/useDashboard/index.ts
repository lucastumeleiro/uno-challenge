import { useCallback } from "react";
import { api } from "@Lib/api";
import type { IDashboardData } from "./Types";

export function useDashboard() {
  const getDashboard = useCallback(async () => {
    try {
      const response = await (api.client as any).dashboard.$get();
      return await api.handleResponse<IDashboardData>(
        Promise.resolve(response),
      );
    } catch (err) {
      return null;
    }
  }, []);

  return { getDashboard };
}
