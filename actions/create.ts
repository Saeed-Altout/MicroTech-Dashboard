"use server";

import * as z from "zod";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

import { itemSchema } from "@/schemas";
import { cookies } from "next/headers";
import { refreshToken } from "./refresh-token";
import { logout } from "./logout";
export const createItem = async (
  values: z.infer<typeof itemSchema>,
  enterypoint: string,
  data: any
) => {
  const cookiesList = cookies();
  const hasToken = cookiesList.has("token");
  const token = cookiesList.get("token");

  if (!hasToken) {
    redirect("/auth/login");
  }

  const validatedFields = itemSchema.safeParse(values);
  if (!validatedFields.success) return { error: "InValid fields" };

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${enterypoint}/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token?.value}` || "",
        },
      }
    );
    return { success: "New item created!" };
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 400:
          return { error: error.response?.data.message };
        case 401:
          refreshToken(() => {
            createItem(values, enterypoint, data);
          });
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
