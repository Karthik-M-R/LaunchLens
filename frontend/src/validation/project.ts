import { z } from "zod";

export const createProjectSchema = z.object({

  name: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters.")
    .max(50, "Project name cannot exceed 50 characters."),

  website: z
    .string()
    .trim()
    .url("Enter a valid website URL."),

  description: z
    .string()
    .trim()
    .optional(),

});

export type CreateProjectFormData =
  z.infer<typeof createProjectSchema>;