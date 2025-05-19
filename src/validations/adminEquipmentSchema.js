import { z } from "zod";

export const adminEquipmentSchema = z.object({
  name: z.string().min(2, "Equipment name must be at least 2 characters").max(50, "Equipment name must not exceed 50 characters"),

  industryId: z.number({
    required_error: "Please select an industry",
    invalid_type_error: "Please select an industry",
  }),
  isVisible: z.boolean().default(true),
});

export const adminIndustrySchema = z.object({
  name: z.string().min(2, "Industry name must be at least 2 characters").max(50, "Industry name must not exceed 50 characters"),
  industry_image: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Industry image is required",
  }),
  isVisible: z.boolean().default(true),
});
