import { Request, Response } from "express";

import prisma from "../config/prisma";

import { asyncHandler } from "../utils/asyncHandler";

import {
  createProjectSchema,
} from "../validation/project.validation";

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {

    const data =
      createProjectSchema.parse(req.body);

    const project =
      await prisma.project.create({

        data: {

          name: data.name,

          description:
            data.description,

          website:
            data.website,

          userId:
            req.user!.userId,

        },

      });

    res.status(201).json({

      success: true,

      message:
        "Project created successfully.",

      data: project,

    });

  }
);

export const getProjects = asyncHandler(
  async (req: Request, res: Response) => {

    const projects =
      await prisma.project.findMany({

        where: {

          userId:
            req.user!.userId,

        },

        orderBy: {

          createdAt: "desc",

        },

      });

    res.status(200).json({

      success: true,

      data: projects,

    });

  }
);