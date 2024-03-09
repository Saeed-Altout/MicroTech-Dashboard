"use server";

import { onError } from "@/lib/error";
import { GET } from "@/lib/api";
import { deleteCookie, hasCookie, setCookie } from "@/lib/cookie";

export const clearToken = async () => {
  deleteCookie("refresh_token");
  deleteCookie("token");
};

export const refreshToken = async () => {
  const refreshToken = hasCookie("refresh_token");

  try {
    const res = await GET("auth/refresh_token", refreshToken);

    setCookie("refresh_token", res.data.data.refresh_token);
    setCookie("token", res.data.data.token);

    return { success: "Success" };
  } catch (error) {
    onError(error);
  }
};
