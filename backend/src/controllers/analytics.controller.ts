import { Request, Response } from "express";

import prisma from "../config/prisma";

import { getCampaignAnalytics } from "../services/analytics.service";

export const getAnalytics = async (
  req: Request,
  res: Response
) => {
  try {

    const userId = req.user!.userId;

    const campaignId = req.params.id as string;

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

      return res.status(404).json({

        success: false,

        message: "Campaign not found.",

      });

    }

    const analytics =
      await getCampaignAnalytics(
        campaignId
      );

    return res.json({

      success: true,

      data: analytics,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error",

    });

  }
};