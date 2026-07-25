import { Request, Response } from "express";

import prisma from "../config/prisma";

import {
  signupSchema,
  loginSchema,
} from "../validation/auth.validation";

import { asyncHandler } from "../utils/asyncHandler";
import { generateToken }
from "../utils/jwt";

import {
  hashPassword,
  comparePassword,
} from "../utils/hash";

export const signup = asyncHandler(
  async (req: Request, res: Response) => {

    const data = signupSchema.parse(req.body);

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Email already exists",
      });
      return;
    }

    const hashedPassword =
      await hashPassword(data.password);

    const user =
      await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  }
);

export const login = asyncHandler(
  async (req: Request, res: Response) => {

    const data = loginSchema.parse(req.body);

    const user =
      await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const isMatch =
      await comparePassword(
        data.password,
        user.password
      );

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    

    const token = generateToken(
  user.id
);

res.cookie(

  "token",

  token,

  {

    httpOnly: true,

    secure:
      process.env.NODE_ENV === "production",

    sameSite: "lax",

    maxAge:
      7 * 24 * 60 * 60 * 1000,

  }

);

res.status(200).json({

  success: true,

  message: "Login successful",

  data: {

    id: user.id,

    name: user.name,

    email: user.email,

  },

});

  }
);


export const me = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user!.userId,
      },

      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);
/**Think of me() as answering one question

Every time the frontend calls:

GET /api/auth/me

it's simply asking:

"Based on the cookie you already have, who am I?"

The backend verifies the cookie, identifies the user, 
fetches the latest user information from the database, and returns it. */


export const logout = asyncHandler(
  async (req: Request, res: Response) => {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
);

