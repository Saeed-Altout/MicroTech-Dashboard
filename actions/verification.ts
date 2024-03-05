"use server";

import * as z from "zod";
import axios from "axios";

import { codeSchema } from "@/schemas";
import { cookies } from "next/headers";
export const verification = async (
  values: z.infer<typeof codeSchema>,
  username: string
) => {
  const validatedFields = codeSchema.safeParse(values);
  if (!validatedFields.success) return { error: "InValid fields" };

  const { code } = validatedFields.data;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify_code`,
      {
        user_name: username,
        code: code,
      }
    );
    cookies().set("name", res.data.data.user_name);
    cookies().set("email", res.data.data.email);
    cookies().set("refresh_token", res.data.data.refresh_token);
    cookies().set("token", res.data.data.token);

    return { success: "Success" };
  } catch (error) {
    return { success: "Something went wrong!" };
  }
};
