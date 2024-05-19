"use client";

import Axios from "axios";

export const axios = Axios.create({
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

    const response = await axios.get("auth/refresh_token", {
      headers: {
        Authorization: `Bearer ${user.refresh_token || ""}`,
      },
    });

    const { token } = response.data.data;
    localStorage.setItem("access_token", token);
    return token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
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
      console.error(
        "Access forbidden: you do not have the necessary permissions"
      );
    }

    return Promise.reject(error);
  }
);
