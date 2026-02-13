import { useCallback } from "react";
import { api } from "@Lib/api";
import type {
  CreateLeadData,
  LeadDTO,
  LeadStatus,
  ListLeadsParams,
  UpdateLeadData,
} from "./Types";

export function useLeads() {
  const getLeads = useCallback(async (params?: ListLeadsParams) => {
    try {
      const queryParams: { search?: string; status?: LeadStatus } = {};
      if (params?.search) queryParams.search = params.search;
      if (params?.status) queryParams.status = params.status;

      const response = await api.client.leads.$get({
        query: queryParams,
      });
      return await api.handleResponse<LeadDTO[]>(Promise.resolve(response));
    } catch (err) {
      return [];
    }
  }, []);

  const getLead = useCallback(async (id: string) => {
    try {
      const response = await api.client.leads[":id"].$get({
        param: { id },
      });
      return await api.handleResponse<LeadDTO>(Promise.resolve(response));
    } catch (err) {
      return null;
    }
  }, []);

  const createLead = useCallback(async (data: CreateLeadData) => {
    try {
      const response = await api.client.leads.$post({
        json: data,
      });
      return await api.handleResponse<LeadDTO>(Promise.resolve(response));
    } catch (err) {
      return null;
    }
  }, []);

  const updateLead = useCallback(async (id: string, data: UpdateLeadData) => {
    try {
      const response = await api.client.leads[":id"].$put({
        param: { id },
        json: data,
      });
      return await api.handleResponse<LeadDTO>(Promise.resolve(response));
    } catch (err) {
      return null;
    }
  }, []);

  const deleteLead = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await api.client.leads[":id"].$delete({
        param: { id },
      });
      await api.handleResponse<{ message: string }>(Promise.resolve(response));
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  return {
    getLeads,
    getLead,
    createLead,
    updateLead,
    deleteLead,
  };
}
