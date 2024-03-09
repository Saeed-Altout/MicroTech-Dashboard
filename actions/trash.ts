"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { onError } from "@/lib/error";

export async function trash(endpoint: string, id: string) {
  const cookiesList = cookies();
  const token = cookiesList.get("token");

  // if (!token) {
  //   redirect("/auth/login");
  // }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/${endpoint}/delete?id=${id}`;

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token?.value}` || "",
    },
  };

  try {
    await axios.delete(url, config);
    return { success: "Deleted success." };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
}
