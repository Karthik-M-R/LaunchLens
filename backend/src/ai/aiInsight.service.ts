import {
  buildAIContext,
  AnalyticsData,
} from "./contextBuilder";

import {
  buildSystemPrompt,
  buildUserPrompt,
} from "./promptBuilder";

import {
  AIProviderRouter,
} from "./providerRouter";

import { aiInsightSchema } from "../validation/ai.validation";

import prisma from "../config/prisma";

import { getCampaignAnalytics } from "../services/analytics.service";

export const generateCampaignInsights = async (
  campaignId: string,
  userId: string
) => {

  // 1. Verify that the campaign belongs
  //    to the authenticated user.

  const campaign =
    await prisma.campaign.findFirst({
      where: {
        id: campaignId,

        project: {
          userId,
        },
      },
    });

  if (!campaign) {
    throw new Error(
      "Campaign not found."
    );
  }

  // 2. Reuse the existing analytics service.

  const analytics =
    await getCampaignAnalytics(
      campaignId
    );

  // 3. Build the context that will be
  //    given to the AI.

  const context =
    buildAIContext(
      analytics
    );

  // 4. Build the prompts.

  const systemPrompt =
    buildSystemPrompt();

  const userPrompt =
    buildUserPrompt(
      context
    );

  // 5. Call AI.

  const provider =
  new AIProviderRouter();

  const response =
    await provider.generateInsight(
      systemPrompt,
      userPrompt
    );

  // 6. Convert  JSON string
  //    into a JavaScript object.

  let parsedResponse: unknown;

  try {

    parsedResponse =
      JSON.parse(response);

  } catch {

    throw new Error(
      "AI provider returned invalid JSON."
    );

  }

  // 7. Validate the AI response.

  const validated =
    aiInsightSchema.parse(
      parsedResponse
    );

  // 8. Return only validated data.

  return validated;
};