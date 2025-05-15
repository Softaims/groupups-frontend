import { z } from "zod";

export const adminResetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters").max(40, "Password can't exceed 40 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
