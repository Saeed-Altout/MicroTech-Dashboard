"use server";
import axios, { AxiosRequestConfig } from "axios";
import { onError } from "@/lib/error";
import { cookies } from "next/headers";
export const logout = async () => {
  const cookiesList = cookies();
  const token = cookiesList.get("next__token");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  };
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_LOGOUT}`, config);
    cookiesList.delete("next__email");
    cookiesList.delete("next__refresh_token");
    cookiesList.delete("next__token");
    cookiesList.delete("next__user_name");
    return { success: "Success Goodbay 👋" };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};
