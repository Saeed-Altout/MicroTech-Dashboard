"use server";

import * as z from "zod";
import axios from "axios";

import { itemSchema } from "@/schemas";

export const create = async (
  values: z.infer<typeof itemSchema>,
  enterypoint: string
) => {
  const validatedFields = itemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, icon } = validatedFields.data;

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${enterypoint}/create`,
      {
        name: name,
        icon: icon,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
