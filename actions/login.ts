"use server";

import * as z from "zod";
import axios from "axios";

import { LoginSchema } from "@/schemas";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "InValid fields" };

  const { username, password } = validatedFields.data;

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/send_code`, {
      user_name: username,
      password: password,
    });
    return { success: "Success" };
  } catch (error) {
    return { success: "Something went wrong!" };
  }
};
