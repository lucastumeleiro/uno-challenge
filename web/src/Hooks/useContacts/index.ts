import { useCallback } from "react";
import { api } from "@Lib/api";
import type {
  ContactDTO,
  CreateContactData,
  ListContactsParams,
  UpdateContactData,
} from "./Types";

export function useContacts() {
  const getContacts = useCallback(async (params?: ListContactsParams) => {
    try {
      const queryParams = params?.search ? { search: params.search } : {};
      const response = await api.client.contacts.$get({
        query: queryParams as { search?: string },
      });
      return await api.handleResponse<ContactDTO[]>(Promise.resolve(response));
    } catch (err) {
      return [];
    }
  }, []);

  const getContact = useCallback(async (id: string) => {
    try {
      const response = await api.client.contacts[":id"].$get({
        param: { id },
      });
      return await api.handleResponse<ContactDTO>(Promise.resolve(response));
    } catch (err) {
      return null;
    }
  }, []);

  const createContact = useCallback(async (data: CreateContactData) => {
    try {
      const response = await api.client.contacts.$post({
        json: data,
      });
      return await api.handleResponse<ContactDTO>(Promise.resolve(response));
    } catch (err) {
      return null;
    }
  }, []);

  const updateContact = useCallback(
    async (id: string, data: UpdateContactData) => {
      try {
        const response = await api.client.contacts[":id"].$put({
          param: { id },
          json: data,
        });
        return await api.handleResponse<ContactDTO>(Promise.resolve(response));
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

  return {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
  };
}
