"use server";

import * as z from "zod";
import axios from "axios";
import { cookies } from "next/headers";

import { codeSchema } from "@/schemas";
import { onError } from "@/lib/error";

export const verification = async (values: z.infer<typeof codeSchema>) => {
  const validatedFields = codeSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const cookiesList = cookies();

  const { code } = validatedFields.data;
  const username = cookiesList.get("next_user_name");

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_VERIFY_CODE}`, {
      user_name: username?.value,
      code: code,
    });

    cookiesList.delete("next_user_name");
    cookiesList.set("next__user_name", res?.data?.data?.user_name);
    cookiesList.set("next__email", res?.data?.data?.email);
    cookiesList.set("next__email", res?.data?.data?.email);
    cookiesList.set("next__token", res?.data?.data?.token);
    cookiesList.set("next__refresh_token", res?.data?.data?.refresh_token);

    return { success: "Verify code success", token: res?.data?.data?.token };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};
