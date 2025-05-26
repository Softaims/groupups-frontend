import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100, "Product name should be less than 100 characters"),
  description: z.string().min(10, "Description must be atleast 10 characters"),
  image: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", {
      message: "Image is required",
    })
    .refine(
      (file) => {
        if (file instanceof File) {
          const validTypes = ["image/jpeg", "image/png", "image/jpg"];
          return validTypes.includes(file.type);
        }
        return true;
      },
      {
        message: "Only JPEG, PNG images are allowed",
      }
    )
    .refine(
      (file) => {
        if (file instanceof File) {
          return file.size <= 2 * 1024 * 1024; // 2MB
        }
        return true;
      },
      {
        message: "Image size must be less than 2MB",
      }
    ),
  price: z.coerce
    .number()
    .min(0, "Price cannot be negative")
    .refine((val) => !isNaN(val), "Price must be a number"),
  why_good_fit_reason: z.string().min(1, "Why good fit reason is required"),

  equipment_id: z.string().min(1, "Equipment is required"),
});
