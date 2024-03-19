import { onError } from "@/lib/error";
import axios, { AxiosRequestConfig } from "axios";

export const activeProject = async (id: string, data: any) => {
  const token = window.localStorage.getItem("next__%&$");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_ACTIVATE_PROJECT}?id=${id}`,
      data,
      config
    );

    return { success: data === 0 ? "Project true" : "project fasle" };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};
export const createFastProject = async (data: any) => {
  const token = window.localStorage.getItem("next__%&$");

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_CREATE_FAST_PROJECT}`,
      data,
      config
    );
    return { success: `Project created.` };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};
