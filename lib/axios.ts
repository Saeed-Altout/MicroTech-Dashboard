"use client";

import Axios from "axios";
import { toast } from "sonner";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const axiosAuth = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const refreshAccessToken = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axiosAuth.get("auth/refresh_token", {
      headers: {
        Authorization: `Bearer ${user.refresh_token || ""}`,
      },
    });
    const token = response.data.data.token;
    localStorage.setItem("access_token", token);
    return token;
  } catch (error) {
    // localStorage.removeItem("user");
    // localStorage.removeItem("access_token");
    // window.location.assign("/auth/login");
    return null;
  }
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    if (response?.status === 403) {
      toast.error(
        "Access forbidden: you do not have the necessary permissions"
      );
    }

    return Promise.reject(error);
  }
);

abstract class DataFetcher {
  abstract fetchData(url: string): Promise<any>;
  abstract postData(
    url: string,
    data: any,
    messageSuccess?: string,
    messageError?: string
  ): Promise<any>;

  abstract deleteData(
    url: string,
    messageSuccess?: string,
    messageError?: string
  ): Promise<any>;
}

export class AxiosData extends DataFetcher {
  async fetchData(url: string) {
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      if (Axios.isAxiosError(error) && !url.includes("new")) {
        toast.error(error.response?.data.message || "Something went wrong!");
      }
      throw error;
    }
  }

  async postData(
    url: string,
    data: any,
    messageSuccess?: string,
    messageError?: string
  ) {
    try {
      await axios.post(url, data);
      toast.success(messageSuccess || "Success");
      return { success: true };
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message ||
            messageError ||
            "Something went wrong!"
        );
      }
    }
  }

  async deleteData(
    url: string,
    messageSuccess?: string,
    messageError?: string
  ) {
    try {
      await axios.delete(url);
      toast.success(messageSuccess || "Deleted successfully!");
      return { success: true };
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message || messageError || "Failed to delete!"
        );
      }
    }
  }
}

abstract class Auth {
  abstract login(
    url: string,
    data: any,
    messageSuccess?: string,
    messageError?: string
  ): Promise<any>;

  abstract verification(
    url: string,
    data: any,
    messageSuccess?: string,
    messageError?: string
  ): Promise<any>;
}

export class AxiosAuth extends Auth {
  async login(
    url: string,
    data: any,
    messageSuccess?: string,
    messageError?: string
  ) {
    try {
      await axios.post(url, data);
      toast.success(messageSuccess || "Success");
      return { success: true };
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message ||
            messageError ||
            "Something went wrong!"
        );
      }
    }
  }
  async verification(
    url: string,
    data: any,
    messageSuccess?: string,
    messageError?: string
  ) {
    try {
      const res = await axios.post(url, data);
      toast.success(messageSuccess || "Success");
      if (res.data) {
        localStorage.setItem("access_token", res?.data?.data?.token || "");
        localStorage.setItem("user", JSON.stringify(res?.data?.data) || "{}");
      }
      return { success: true };
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message ||
            messageError ||
            "Something went wrong!"
        );
      }
    }
  }
}
