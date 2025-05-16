import { z } from "zod";

export const adminEquipmentSchema = z.object({
  name: z.string().min(2, "Equipment name must be at least 2 characters").max(50, "Equipment name must not exceed 50 characters"),

  industryId: z.number({
    required_error: "Please select an industry",
    invalid_type_error: "Please select an industry",
  }),
});
