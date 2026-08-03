import { Request, Response } from "express";

import prisma from "../config/prisma";

export const getCampaignAnalytics = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const campaignId = req.params.id as string;

    // Verify ownership
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

    const totalClicks =
      await prisma.clickEvent.count({
        where: {
          campaignId,
        },
      });

    const visitors =
      await prisma.clickEvent.findMany({
        where: {
          campaignId,
        },

        distinct: ["visitorId"],

        select: {
          visitorId: true,
        },
      });

    const uniqueVisitors =
      visitors.length;

    return res.json({
      success: true,

      data: {
        totalClicks,
        uniqueVisitors,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Internal server error.",
    });

  }
};