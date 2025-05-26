import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce
    .number()
    .min(0, "Price cannot be negative")
    .refine((val) => !isNaN(val), "Price must be a number"),
  stock: z.coerce
    .number()
    .min(0, "Stock cannot be negative")
    .int("Stock must be a whole number")
    .refine((val) => !isNaN(val), "Stock must be a number"),
  is_featured: z.boolean().default(false),
  equipment_id: z.number().min(1, "Equipment is required"),
}); 