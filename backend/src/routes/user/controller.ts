import { Request, Response } from "express";
import prisma from "../../db";
import { signinBodySchema, signupBodySchema } from "./zodSchema";
import { createHash, validatePassword } from "../../helpers/hash";
import { createJWT } from "../../helpers/jwt";
import { UserAuthRequest } from "../../helpers/types";

export const userSignupController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = signupBodySchema.safeParse(payload);

    if (!result.success) {
      return res.status(411).json({
        error: result.error.errors,
      });
    }

    const data = result.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: data.email,
          },
          {
            username: data.username,
          },
        ],
      },
    });

    if (existingUser) {
      return res.status(411).json({
        error: "Username or email already in use.",
      });
    }

    const passwordHash = await createHash(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        username: data.username,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    const token = createJWT({
      id: user.id,
      username: user.username,
    });

    res.status(201).json({
      message: "User created Successfully.",
      user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const userSigninController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = signinBodySchema.safeParse(payload);

    if (!result.success) {
      return res.status(411).json({
        error: result.error.errors,
      });
    }

    const data = result.data;

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return res.status(411).json({
        error: "No such user exists",
      });
    }

    const matchPassword = await validatePassword(
      data.password,
      user.passwordHash
    );

    if (!matchPassword) {
      return res.status(411).json({
        error: "No such user exists",
      });
    }

    const token = createJWT({
      id: user.id,
      username: user.username,
    });

    res.status(201).json({
      message: "User logged in Successfully.",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const userProfileController = async (req:UserAuthRequest, res:Response) => {
  const userId = req.userId;

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    }, select: {
      id: true,
      email: true,
      username: true,
      posts: true
    }
  })

  if (!user) {
    return res.status(411).json({
      error: "Invalid token",
    })
  }

  res.status(200).json({
    user
  })
}