import { z } from "zod";

export const adminEquipmentSchema = z.object({
  name: z
    .string()
    .min(2, "Equipment name must be at least 2 characters")
    .max(50, "Equipment name must not exceed 50 characters"),
  industry_id: z.string().min(1, "Please select an industry"),
  visibility: z.boolean().default(true),
  productsVisibility: z.boolean().default(true),
  maxProducts: z
    .union([z.number().min(3, "Must be at least 3"), z.undefined()])
    .optional(),
});
