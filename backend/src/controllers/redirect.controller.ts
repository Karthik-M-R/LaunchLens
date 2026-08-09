import { Request, Response } from "express";
import { UAParser } from "ua-parser-js";
import prisma from "../config/prisma";

import { getVisitorId } from "../utils/getVisitorId";
import { detectDevice } from "../utils/detectDevice";

export const redirectToCampaign = async (
  req: Request,
  res: Response
) => {
  try {
    const publicSlug = req.params.publicSlug as string;

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

    const userAgentString = req.get("user-agent") ?? "";
    const device = detectDevice(
      userAgentString
    );

    let browser = "Unknown";
    try {
      if (userAgentString) {
        const parser = new UAParser(userAgentString);
        const parsedBrowser = parser.getBrowser().name;
        if (parsedBrowser) {
          browser = parsedBrowser;
        }
      }
    } catch (e) {
      browser = "Unknown";
    }

    await prisma.clickEvent.create({
      data: {
        campaignId: campaign.id,

        visitorId,

        ipAddress:
          req.ip ?? null,

        device,
        browser,

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