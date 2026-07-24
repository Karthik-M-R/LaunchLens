import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(40, "Project name is too long"),

  website: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .max(200, "Maximum 200 characters")
    .optional()
    .or(z.literal("")),
});

export type CreateProjectFormData =
  z.infer<typeof createProjectSchema>;