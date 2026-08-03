import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Campaign name must be at least 3 characters")
    .max(100),

  destinationUrl: z
    .string()
    .url("Enter a valid URL")


});

export const updateCampaignSchema =
  createCampaignSchema.partial();

export type CreateCampaignInput =
  z.infer<typeof createCampaignSchema>;

export type UpdateCampaignInput =
  z.infer<typeof updateCampaignSchema>;