import { Request, Response } from "express";

import prisma from "../config/prisma";

import { asyncHandler } from "../utils/asyncHandler";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../validation/project.validation";

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {

    const data =
      createProjectSchema.parse(req.body);
      const existingProject =
  await prisma.project.findFirst({

    where: {

      userId: req.user!.userId,

      name: data.name,

    },

  });

if (existingProject) {

  res.status(409).json({

    success: false,

    message:
      "A project with this name already exists.",

  });

  return;

}

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

export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {

    const project =
      await prisma.project.findFirst({

        where: {

          id: req.params.id as string,

          userId: req.user!.userId,

        },

      });

    if (!project) {

      res.status(404).json({

        success: false,

        message: "Project not found.",

      });

      return;

    }

    res.status(200).json({

      success: true,

      data: project,

    });

  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {

    const data =
  updateProjectSchema.parse(req.body);
  /*
Only check duplicate
if client is changing
the project name.
*/

if (data.name) {

  const duplicate =
    await prisma.project.findFirst({

      where: {

        userId:
          req.user!.userId,

        name:
          data.name,

        /*
        Ignore current project.

        Otherwise updating
        without changing name
        would fail.
        */

        NOT: {

          id: req.params.id as string,

        },

      },

    });

  if (duplicate) {

    res.status(409).json({

      success: false,

      message:
        "Another project with this name already exists.",

    });

    return;

  }

}

    const existing =
      await prisma.project.findFirst({

        where: {

          id: req.params.id as string,

          userId: req.user!.userId,

        },

      });

    if (!existing) {

      res.status(404).json({

        success: false,

        message: "Project not found.",

      });

      return;

    }

    const updated =
      await prisma.project.update({

        where: {

          id: req.params.id as string,

        },

        data,

      });

    res.status(200).json({

      success: true,

      message: "Project updated successfully.",

      data: updated,

    });

  }
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {

    const existing =
      await prisma.project.findFirst({

        where: {

          id: req.params.id as string,

          userId: req.user!.userId,

        },

      });

    if (!existing) {

      res.status(404).json({

        success: false,

        message: "Project not found.",

      });

      return;

    }

    await prisma.project.delete({

      where: {

        id: req.params.id as string,

      },

    });

    res.status(200).json({

      success: true,

      message: "Project deleted successfully.",

    });

  }
);