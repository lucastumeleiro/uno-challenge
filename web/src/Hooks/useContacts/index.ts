import { useCallback } from "react";
import { api } from "@Lib/api";
import type { IPaginatedResponse } from "@/Types/pagination";
import type { ILeadDTO } from "@Hooks/useLeads/Types";
import type {
  IContactDTO,
  ICreateContactData,
  IListContactsParams,
  IUpdateContactData,
} from "./Types";

export function useContacts() {
  const getContacts = useCallback(async (params?: IListContactsParams) => {
    try {
      const queryParams: { search?: string; page?: number; limit?: number } = {};
      if (params?.search) queryParams.search = params.search;
      if (params?.page) queryParams.page = params.page;
      if (params?.limit) queryParams.limit = params.limit;

      const response = await api.client.contacts.$get({
        query: queryParams as Record<string, string>,
      });
      return await api.handleResponse<IPaginatedResponse<IContactDTO>>(Promise.resolve(response));
    } catch (err) {
      return { data: [], total: 0, page: 1, limit: 10 };
    }
  }, []);

  const getContact = useCallback(async (id: string) => {
    try {
      const response = await api.client.contacts[":id"].$get({
        param: { id },
      });
      return await api.handleResponse<IContactDTO>(Promise.resolve(response));
    } catch (err) {
      return null;
    }
  }, []);

  const createContact = useCallback(async (data: ICreateContactData) => {
    try {
      const response = await api.client.contacts.$post({
        json: data,
      });
      return await api.handleResponse<IContactDTO>(Promise.resolve(response));
    } catch (err) {
      return null;
    }
  }, []);

  const updateContact = useCallback(
    async (id: string, data: IUpdateContactData) => {
      try {
        const response = await api.client.contacts[":id"].$put({
          param: { id },
          json: data,
        });
        return await api.handleResponse<IContactDTO>(Promise.resolve(response));
      } catch (err) {
        return null;
      }
    },
    [],
  );

  const deleteContact = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await api.client.contacts[":id"].$delete({
        param: { id },
      });
      await api.handleResponse<{ message: string }>(Promise.resolve(response));
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const getContactLeads = useCallback(async (contactId: string) => {
    try {
      const response = await (api.client.contacts as any)[":contactId"].leads.$get({
        param: { contactId },
      });
      return await api.handleResponse<ILeadDTO[]>(Promise.resolve(response));
    } catch (err) {
      return [];
    }
  }, []);

  return {
    getContacts,
    getContact,
    getContactLeads,
    createContact,
    updateContact,
    deleteContact,
  };
}
