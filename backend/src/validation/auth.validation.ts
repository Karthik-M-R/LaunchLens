import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50),

  email: z
    .email("Invalid email")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32),
});

export const loginSchema = z.object({
  email: z
    .email("Invalid email")
    .transform((email) => email.toLowerCase()),

  password: z.string().min(1, "Password is required"),
});