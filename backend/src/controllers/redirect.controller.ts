import { Request, Response } from "express";

import prisma from "../config/prisma";

export const redirectToCampaign = async (
  req: Request,
  res: Response
) => {
  try {

    const { trackingCode } = req.params as { trackingCode: string };

    const campaign =
      await prisma.campaign.findUnique({
        where: {
          trackingCode,
        },
      });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    // await prisma.clickEvent.create({
    //   data: {

    //     campaignId: campaign.id,

    //     visitorId: "temp-visitor",

    //     ipAddress: req.ip ?? null,

    //     browser:
    //       req.get("user-agent") ?? null,

    //     referrer:
    //       req.get("referer") ?? null,

    //     device: "Unknown",

    //   },
    // });

    return res.redirect(
      campaign.destinationUrl
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};