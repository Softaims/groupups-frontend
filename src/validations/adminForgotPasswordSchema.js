import { z } from "zod";

export const adminForgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
});
