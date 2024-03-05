"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const refreshToken = async (onRefreshSuccess: () => void) => {
  const cookiesList = cookies();
  const hasRefreshToken = cookiesList.has("refresh_token");
  const refreshToken = cookiesList.get("refresh_token");

  if (!hasRefreshToken) {
    redirect("/auth/login");
  }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh_token`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    cookies().set("refresh_token", res.data.data.refresh_token);
    cookies().set("token", res.data.data.token);
    onRefreshSuccess();

    return { success: "Success" };
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 400:
          return { error: error.response?.data.message };
        case 401:
          cookiesList.delete("name");
          cookiesList.delete("email");
          cookiesList.delete("refresh_token");
          cookiesList.delete("token");
          redirect("/auth/login");
        case 403:
          cookiesList.delete("name");
          cookiesList.delete("email");
          cookiesList.delete("refresh_token");
          cookiesList.delete("token");
          redirect("/auth/login");
        case 404:
          redirect("/error/not-found");
        default:
          redirect("/error/un-known");
      }
    }

    return { error: "Something went wrong!" };
  }
};
