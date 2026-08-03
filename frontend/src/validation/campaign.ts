import { z } from "zod";

export const campaignSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      3,
      "Campaign name must be at least 3 characters"
    ),

  destinationUrl: z
    .string()
    .url("Enter a valid URL"),
});

export type CampaignFormData =
  z.infer<typeof campaignSchema>;