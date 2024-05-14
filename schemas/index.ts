import * as z from "zod";

export const registerForm = z.object({
  user_name: z.string().min(2, {
    message: "Username is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

export const loginForm = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(2, {
    message: "Password is required",
  }),
});

export const contactSchema = z.object({
  full_name: z.string().min(2, {
    message: "Full Name is required",
  }),
  email: z.string().min(2, {
    message: "Email is required",
  }),
  inquiry_type: z.string(),
  reaching_way: z.string(),
  message: z.string(),
});

export const bookNowSchema = z.object({
  full_name: z.string().min(2, {
    message: "Full Name is required",
  }),
  email: z.string().min(2, {
    message: "Email is required",
  }),
  message: z.string(),
});
