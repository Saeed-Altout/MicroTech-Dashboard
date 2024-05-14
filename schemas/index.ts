import * as z from "zod";

export const loginForm = z.object({
  user_name: z.string().min(2, {
    message: "Username is required",
  }),
  password: z.string().min(2, {
    message: "Password is required",
  }),
});

export const verificationSchema = z.object({
  code: z.string().min(6, {
    message: "Code is required",
  }),
});
