import { Request, Response } from "express";

import prisma from "../config/prisma";

import { asyncHandler } from "../utils/asyncHandler";

export const getDashboard = asyncHandler(
  async (req: Request, res: Response) => {

    const userId = req.user!.userId;

    /*
      Count projects belonging
      to current user.
    */

    const totalProjects =
      await prisma.project.count({
        where: {
          userId,
        },
      });

    /*
      Count campaigns inside
      user's projects.
    */

    const totalCampaigns =
      await prisma.campaign.count({
        where: {
          project: {
            userId,
          },
        },
      });

    /*
      Sum all clicks
      across every campaign.
    */

    const clickAggregate =
      await prisma.clickEvent.aggregate({
        where: {
          campaign: {
            project: {
              userId,
            },
          },
        },

        _count: true,
      });

    /*
      Fetch latest 5 projects.
    */

    const recentProjects =
      await prisma.project.findMany({

        where: {
          userId,
        },

        orderBy: {
          createdAt: "desc",
        },

        take: 5,

        select: {
          id: true,
          name: true,
          createdAt: true,
        },

      });

    /*
      Activity system
      will come later.

      Return empty array
      for now.
    */
    const recentActivity: any[] = [];

    res.status(200).json({

      success: true,

      data: {

        stats: {

          projects: totalProjects,

          campaigns: totalCampaigns,

          clicks:
            clickAggregate._count,

        },

        recentProjects,

        recentActivity,

      },

    });

  }
);