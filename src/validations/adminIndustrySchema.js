import { z } from "zod";

export const adminIndustrySchema = z.object({
  name: z.string().min(2, "Industry name must be at least 2 characters").max(50, "Industry name must not exceed 50 characters"),
  industry_image: z
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
  visibility: z.boolean().default(true),
});
