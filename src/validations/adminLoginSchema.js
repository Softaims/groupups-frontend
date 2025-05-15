import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters").max(40, "Password must not exceed 40 characters"),
});
