"use server";

import * as z from "zod";
import axios from "axios";

import { LoginSchema } from "@/schemas";
import { onError } from "@/lib/error";
import { cookies } from "next/headers";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };
  const cookiesList = cookies();
  const { username, password } = validatedFields.data;

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_LOGIN}`, {
      user_name: username,
      password: password,
    });
    cookiesList.set("next_user_name", username);
    return { success: "Success, please check your email." };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};
