import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is requierd 🙄",
  }),
  password: z.string().min(1, {
    message: "Password is requierd 🔑",
  }),
});

export const codeSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
export const resetSchema = z.object({
  password: z.string().min(1, {
    message: "Password is requierd 🔑",
  }),
});
