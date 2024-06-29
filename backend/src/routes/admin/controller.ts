import { Request, Response } from "express";
import prisma from "../../db";
import { adminLoginSchema } from './zodSchema';
import { createJWT } from "../../helpers/jwt";
import { validatePassword } from "../../helpers/hash";
import { UserAuthRequest } from "../../helpers/types";

export const adminLoginController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = adminLoginSchema.safeParse(payload);

    if (!result.success) {
      const formattedError: any = {};
      result.error.errors.forEach((e:any) => {
        formattedError[e.path[0]] = e.message;
      });
      return res.status(400).json({ error: { ...formattedError, message: "Invalid Inputs" } });
    }

    const data = result.data;

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
        isAdmin: true,
      },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        isAdmin:true
      },
    });

    if (!user) {
      return res.status(404).json({ error: { message: "No such admin exists" } });
    }

    const matchPassword = await validatePassword(data.password, user.passwordHash);

    if (!matchPassword) {
      return res.status(401).json({ error: { message: "Wrong Password" } });
    }

    const token = createJWT({ id: user.id, isAdmin: user.isAdmin });

    res.status(200).json({ message: "Admin logged in Successfully.", token });
  } catch (error) {
    return res.status(500).json({ error: { message: "An unexpected exception occurred!" } });
  }
};

export const adminProfileController = async (req: UserAuthRequest, res: Response) => {
  const userId = req.userId;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      isAdmin:true
    },
    select: {
      id: true,
      email: true
    },
  });

  if (!user) {
    return res.status(411).json({
      error: "Invalid token",
    });
  }

  res.status(200).json({
    user,
  });
};