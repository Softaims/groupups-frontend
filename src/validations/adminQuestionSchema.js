import { z } from "zod";

const optionSchema = z.object({
  id: z.number(),
  text: z.string().min(1, "Option text is required").max(200, "Option text must not exceed 200 characters"),
});

export const adminQuestionSchema = z.object({
  questionText: z.string().min(2, "Question text must be at least 2 characters").max(500, "Question text must not exceed 500 characters"),
  
  type: z.enum(["open_ended", "multiple_choice", "statement", "file_upload"], {
    required_error: "Question type is required",
    invalid_type_error: "Invalid question type",
  }),

  required: z.boolean().default(false),

  youtubeUrl: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val))
    .refine(
      (url) => {
        if (!url) return true; // Optional field
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return youtubeRegex.test(url);
      },
      {
        message: "Please enter a valid YouTube URL",
      }
    ),

  options: z
    .array(optionSchema)
    .min(2, "Multiple choice questions require at least two options")
    .optional()
    .refine(
      (options) => {
        // Only validate options if type is multiple_choice
        if (options && options.length > 0) {
          return options.every((option) => option.text.trim().length > 0);
        }
        return true;
      },
      {
        message: "All options must have text",
      }
    ),

  allowMultiple: z.boolean().optional(),

  equipmentId: z.number({
    required_error: "Equipment ID is required",
    invalid_type_error: "Equipment ID must be a number",
  }),
}); 