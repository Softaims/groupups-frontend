import * as z from "zod";

export const aiSnippetSchema = z.object({
  snippet_text: z.string().min(1, "AI snippet text is required").max(10000, "AI snippet text cannot exceed 10000 characters"),
  equipment_id: z.string().min(1, "Equipment is required"),
});
