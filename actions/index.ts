"use server";

import * as z from "zod";

import { Axios } from "@/lib/axios";
import { onError } from "@/lib/error";
import { codeSchema } from "@/schemas";
import { LoginSchema } from "@/schemas";

// Crad Actions
export const create = async (endpoint: string, data: any) => {
  const { POST } = await Axios();
  try {
    await POST(`${endpoint}/create`, data);
    return { success: `${endpoint} created.` };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};

export const edit = async (endpoint: string, data: any) => {
  const { POST } = await Axios();
  try {
    await POST(`${endpoint}/edit`, data);
    return { success: `${endpoint} edited.` };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};

export const trash = async (endpoint: string, id: string) => {
  const { DELETE } = await Axios();
  try {
    await DELETE(`${endpoint}/delete?id=${id}`);
    return { success: `${endpoint} deleted.` };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};

export const editImagesProject = async (data: any) => {
  const { POST } = await Axios();
  try {
    await POST(`${process.env.EDIT_IMAGES_PROJECT}`, data);
    return { success: `Images project edited.` };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};
export const addImagesProject = async (data: any) => {
  const { POST } = await Axios();
  try {
    await POST(`${process.env.ADD_IMAGES_PROJECT}`, data);
    return { success: `Images uploaded.` };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};

// Auth Actions
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const { POST } = await Axios();

  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const { username, password } = validatedFields.data;

  try {
    await POST("auth/send_code", {
      user_name: username,
      password: password,
    });
    return { success: "Success, check your email. we had sent code for you." };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};

export const verification = async (
  values: z.infer<typeof codeSchema>,
  username: string
) => {
  const { POST } = await Axios();

  const validatedFields = codeSchema.safeParse(values);
  if (!validatedFields.success) return { error: "InValid fields" };

  const { code } = validatedFields.data;

  try {
    await POST("auth/verify_code", {
      user_name: username,
      code: code,
    });
    return { success: "Verify code success" };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};

export const logout = async () => {
  const { GET } = await Axios();
  try {
    await GET("auth/logout");
    return { success: "Logout success" };
  } catch (error) {
    const message = onError(error);
    return { error: message };
  }
};
