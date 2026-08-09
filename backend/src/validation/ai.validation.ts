import { z } from "zod";

export const aiInsightSchema = z.object({
  summary: z.string(),

  insights: z.array(
    z.object({
      type: z.enum([
        "traffic",
        "source",
        "device",
        "browser",
        "country",
        "trend",
        "data_quality",
      ]),

      title: z.string(),

      description: z.string(),

      evidence: z.string(),
    })
  ),

  recommendations: z.array(
    z.object({
      priority: z.enum([
        "high",
        "medium",
        "low",
      ]),

      title: z.string(),

      action: z.string(),
    })
  ),
});

export type AIInsight = z.infer<
  typeof aiInsightSchema
>;