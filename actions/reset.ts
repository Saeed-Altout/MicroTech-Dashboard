import * as z from "zod";
import axios, { AxiosRequestConfig } from "axios";

import { resetSchema } from "@/schemas";
import { onError } from "@/lib/error";

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const config: AxiosRequestConfig = {
    headers: {},
  };

  try {
    await axios.get(`${process.env.NEXT_PUBLIC_RESET}`, config);
    return { success: "Success" };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};
