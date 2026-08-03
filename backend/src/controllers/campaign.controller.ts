import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import prisma from "../config/prisma";

import {
  createCampaignSchema,
  updateCampaignSchema,
} from "../validation/campaign.validation";
import { generatePublicSlug } from "../utils/generatePublicSlug";
export const createCampaign = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const projectId = req.params.projectId as string;

    const data = createCampaignSchema.parse(req.body);

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    const publicSlug =
      generatePublicSlug(data.name);

    const campaign =
      await prisma.campaign.create({
        data: {
          name: data.name,

          destinationUrl:
            data.destinationUrl,

          publicSlug,

          projectId,
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Campaign created successfully.",
      data: {
        ...campaign,

        trackingLink:
          `${process.env.APP_URL}/r/${campaign.publicSlug}`,
      },
    });

  } catch (error) {

    console.error(error);

    if (
      error instanceof
      Prisma.PrismaClientKnownRequestError
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error.",
    });

  }
};

export const getCampaigns = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const projectId = req.params.projectId as string ;

    const project =
      await prisma.project.findFirst({
        where: {
          id: projectId,
          userId,
        },
      });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    const campaigns =
      await prisma.campaign.findMany({
        where: {
          projectId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    const campaignsWithAnalytics =
      await Promise.all(
        campaigns.map(async (campaign) => {

          const totalClicks =
            await prisma.clickEvent.count({
              where: {
                campaignId: campaign.id,
              },
            });

          const uniqueVisitors =
            await prisma.clickEvent.findMany({
              where: {
                campaignId: campaign.id,
              },

              distinct: ["visitorId"],

              select: {
                visitorId: true,
              },
            });

          return {
            ...campaign,

            trackingLink:
              `${process.env.APP_URL}/r/${campaign.publicSlug}`,

            totalClicks,

            uniqueVisitors:
              uniqueVisitors.length,
          };
        })
      );

    return res.json({
      success: true,
      data: campaignsWithAnalytics,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }
};

export const updateCampaign = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const id = req.params.id as string;

    const data =
      updateCampaignSchema.parse(req.body);

    const campaign =
      await prisma.campaign.findFirst({
        where: {
          id,
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

   const updatedCampaign =
  await prisma.campaign.update({
    where: {
      id,
    },
    data: {
      name: data.name,

      destinationUrl:
        data.destinationUrl,
    },
  });

return res.json({
  success: true,
  message:
    "Campaign updated successfully.",
  data: {
    ...updatedCampaign,

    trackingLink:
      `${process.env.APP_URL}/r/${updatedCampaign.publicSlug}`,
  },
});

  
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const deleteCampaign = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const id = req.params.id as string;

    const campaign =
      await prisma.campaign.findFirst({
        where: {
          id,
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

    await prisma.campaign.delete({
      where: {
        id,
      },
    });

    return res.json({
      success: true,
      message: "Campaign deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};