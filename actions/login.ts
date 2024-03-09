"use server";

import * as z from "zod";

import axios from "axios";
import { onError } from "@/lib/error";
import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const { username, password } = validatedFields.data;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/"auth/send_code"`,
      {
        user_name: username,
        password: password,
      }
    );
    console.log(res);

    return { success: "Success, check your email. we had sent code for you." };
  } catch (error) {
    onError(error);
  }
};
