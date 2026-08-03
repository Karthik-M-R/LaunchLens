import { Request, Response } from "express";

import prisma from "../config/prisma";

import { getVisitorId } from "../utils/getVisitorId";
import { detectDevice } from "../utils/detectDevice";

export const redirectToCampaign = async (
  req: Request,
  res: Response
) => {
  try {
    const { publicSlug } = req.params;

    const campaign =
      await prisma.campaign.findUnique({
        where: {
          publicSlug,
        },
      });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    const visitorId = getVisitorId(
      req,
      res
    );

    const device = detectDevice(
      req.get("user-agent") ?? ""
    );

    await prisma.clickEvent.create({
      data: {
        campaignId: campaign.id,

        visitorId,

        ipAddress:
          req.ip ?? null,

        device,

        referrer:
          req.get("referer") ?? null,
      },
    });

    return res.redirect(
      302,
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