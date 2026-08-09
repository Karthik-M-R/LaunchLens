import { Request, Response } from "express";

import {
  generateCampaignInsights,
} from "../ai/aiInsight.service";


export const generateInsights = async (
  req: Request,
  res: Response
) => {

  try {

    const userId =
      req.user!.userId;

    const campaignId =
      req.params.id as string;


    const insights =
      await generateCampaignInsights(
        campaignId,
        userId
      );


    return res.status(200).json({

      success: true,

      data: insights,

    });

  } catch (error) {

    console.error(
      "AI insights error:",
      error
    );


    if (
      error instanceof Error &&
      error.message ===
        "Campaign not found."
    ) {

      return res.status(404).json({

        success: false,

        message:
          "Campaign not found.",

      });

    }


    return res.status(500).json({

      success: false,

      message:
        "Unable to generate AI insights.",

    });

  }

};