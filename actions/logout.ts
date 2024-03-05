"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookiesList = cookies();
  const hasToken = cookiesList.has("token");
  const token = cookiesList.get("token");

  if (!hasToken) return { error: "Something went wrong!" };

  try {
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    cookiesList.delete("name");
    cookiesList.delete("email");
    cookiesList.delete("refresh_token");
    cookiesList.delete("token");
    return { success: "Logout success" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
