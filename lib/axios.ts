"use client";

import Axios, { AxiosResponse } from "axios";

export const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

const axiosRefresh = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

axiosRefresh.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { refresh_token } = user;
  console.log(refresh_token);

  config.headers.Authorization = `Bearer ${refresh_token}`;
  return config;
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const { response } = error;

    if (response.status === 401) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await axiosRefresh.get("auth/refresh_token");

      localStorage.setItem("access_token", res.data.data.token);
      const newUser = {
        ...user,
        ...res.data.data,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      return error.config();
    }

    throw error;
  }
);
