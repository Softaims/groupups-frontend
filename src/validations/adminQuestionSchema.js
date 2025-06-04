import { z } from "zod";

const baseQuestionSchema = z.object({
  equipment_id: z
    .string({
      required_error: "Equipment ID is required",
    })
    .length(24, {
      message: "Equipment ID must be a valid id",
    }),

  question_type: z.enum(["open_ended", "multiple_choice", "statement", "file_upload"], {
    required_error: "Question type is required",
    invalid_type_error: "Question type must be one of: open_ended, multiple_choice, statement, file_upload",
  }),

  required: z
    .boolean({
      required_error: "Required field must be true or false",
      invalid_type_error: "Required field must be a boolean",
    })
    .default(true),

  youtube_link: z
    .string({
      invalid_type_error: "YouTube link must be a string",
    })
    .url("You must provide a valid YouTube URL")
    .optional()
    .or(z.literal("")),

  question_text: z
    .string({
      required_error: "Question text is required",
    })
    .trim()
    .min(1, {
      message: "Question text cannot be empty",
    }),

  context: z.array(z.string().min(1, "Context item cannot be empty")).default([]),
});

export const simpleQuestionSchema = baseQuestionSchema.extend({
  question_type: z.enum(["open_ended", "statement", "file_upload"], {
    required_error: "Question type is required",
    invalid_type_error: "Question type must be one of: open_ended, multiple_choice, statement, file_upload",
  }),
});

export const multipleChoiceSchema = baseQuestionSchema.extend({
  question_type: z.literal("multiple_choice"),

  options: z
    .array(
      z.object({
        id: z.number(),
        text: z
          .string({
            required_error: "Option text is required",
          })
          .trim()
          .min(1, "Option text cannot be empty"),
      }),
      {
        required_error: "Options are required for multiple choice questions",
      }
    )
    .min(2, "Multiple choice questions must have at least 2 options"),

  allowMultipleSelection: z.boolean({
    required_error: "allowMultipleSelection is required for multiple choice questions",
    invalid_type_error: "allowMultipleSelection must be a boolean",
  }),
});
