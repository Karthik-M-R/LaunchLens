import { z } from "zod";

export const createProjectSchema = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Project name must be at least 3 characters.")
        .max(50, "Project name cannot exceed 50 characters."),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters.")
        .optional(),

    website: z
        .string()
        .trim()
        .url("Please enter a valid website URL."),

});

export type CreateProjectInput =
    z.infer<typeof createProjectSchema>;

export const updateProjectSchema =
  createProjectSchema.partial();

export type UpdateProjectInput =
  z.infer<typeof updateProjectSchema>;