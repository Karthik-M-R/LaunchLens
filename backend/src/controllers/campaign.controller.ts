import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import prisma from "../config/prisma";

import {
  createCampaignSchema,
  updateCampaignSchema,
} from "../validation/campaign";

export const createCampaign = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const projectId = req.params.projectId;

    const data = createCampaignSchema.parse(req.body);

    // Verify project belongs to logged-in user
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

    // Check duplicate tracking code
    const existingCampaign =
      await prisma.campaign.findUnique({
        where: {
          trackingCode: data.trackingCode,
        },
      });

    if (existingCampaign) {
      return res.status(409).json({
        success: false,
        message: "Tracking code already exists.",
      });
    }

    const campaign =
      await prisma.campaign.create({
        data: {
          ...data,
          projectId,
        },
      });

    return res.status(201).json({
      success: true,
      message: "Campaign created successfully.",
      data: campaign,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getCampaigns = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const projectId = req.params.projectId;

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

    const campaigns =
      await prisma.campaign.findMany({
        where: {
          projectId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return res.json({
      success: true,
      data: campaigns,
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

    const id = req.params.id;

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
        data,
      });

    return res.json({
      success: true,
      message: "Campaign updated successfully.",
      data: updatedCampaign,
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

    const id = req.params.id;

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