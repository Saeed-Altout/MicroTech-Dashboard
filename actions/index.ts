"use server";

import { Axios } from "@/lib/axios";
import { onError } from "@/lib/error";

// Crad Actions
export const create = async (endpoint: string, data: any) => {
  const { POST } = await Axios();
  try {
    await POST(`${endpoint}/create`, data);
    return { success: `${endpoint} created.` };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};

export const edit = async (endpoint: string, data: any) => {
  const { POST } = await Axios();
  try {
    await POST(`${endpoint}/edit`, data);
    return { success: `${endpoint} edited.` };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};

export const trash = async (endpoint: string, id: string) => {
  const { DELETE } = await Axios();
  try {
    await DELETE(`${endpoint}/delete?id=${id}`);
    return { success: `${endpoint} deleted.` };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};
