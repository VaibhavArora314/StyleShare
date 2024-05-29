import { Request, Response } from "express";
import prisma from "../../db";
import { signinBodySchema, signupBodySchema } from "./zodSchema";
import { createHash, validatePassword } from "../../helpers/hash";
import { createJWT } from "../../helpers/jwt";
import { UserAuthRequest } from "../../helpers/types";
import crypto from "crypto";
import { sendVerificationEmail } from "../../helpers/sendMail";
import { z } from "zod";

export const userSignupController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = signupBodySchema.safeParse(payload);

    if (!result.success) {
      const formattedError: any = {};
      result.error.errors.forEach((e) => {
        formattedError[e.path[0]] = e.message;
      });
      return res.status(411).json({
        error: { ...formattedError, message: "" },
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
      if (!existingUser.otp) {
        return res.status(411).json({
          error: {
            message: "Username or email already in use.",
          },
        });

      }
    }



    const passwordHash = await createHash(data.password);

    const otp = crypto.randomInt(100000, 999999);  // Generate a 6-digit OTP

    let user;
    if(!existingUser){
      user = await prisma.user.create({
        data: {
          email: data.email,
          passwordHash,
          username: data.username,
          // @ts-ignore
          otp,
        },
        select: {
          id: true,
          email: true,
          username: true,
        },
      });
    }
    else if(existingUser && existingUser.otp){
      user = await prisma.user.update({
        where: {
          id: existingUser.id
        },
        data: {
          otp: otp,
          passwordHash,
        },
        select: {
          id: true,
          email: true,
          username: true,
        }
      })
    }
    
    
    // Send OTP to user's email
    await sendVerificationEmail(user!.email, otp);

    const token = createJWT({
      id: user!.id,
      username: user!.username,
    });

    res.status(201).json({
      message: "User created Successfully.",
      user,
      token: token,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: {
        message: "An unexpected exception occurred! Brooo",
        display: error
      },
    });
  }
};

// import prisma from "../../db";

const otpVerificationSchema = z.object({
  userId: z.string(),
  otp: z.number(),
});

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = otpVerificationSchema.safeParse(payload);

    if (!result.success) {
      const formattedError: any = {};
      result.error.errors.forEach((e) => {
        formattedError[e.path[0]] = e.message;
      });
      return res.status(400).json({
        error: { ...formattedError, message: "Validation error." },
      });
    }

    const { userId, otp } = result.data;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        otp: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: { message: "User not found." },
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        error: { message: "Invalid OTP." },
      });
    }

    const otpAge = Date.now() - new Date(user.createdAt).getTime();
    const otpExpiry = 10 * 60 * 1000; // 10 minutes

    if (otpAge > otpExpiry) {
      return res.status(400).json({
        error: { message: "OTP has expired." },
      });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        otp: null,
      },
    });

    return res.status(200).json({
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      error: { message: "An unexpected error occurred." },
    });
  }
};



export const userSigninController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = signinBodySchema.safeParse(payload);

    if (!result.success) {
      const formattedError: any = {};
      result.error.errors.forEach((e) => {
        formattedError[e.path[0]] = e.message;
      });
      return res.status(411).json({
        error: { ...formattedError, message: "" },
      });
    }

    const data = result.data;

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
      select: {
        otp: true,
        id: true,
        username: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return res.status(411).json({
        error: {
          message: "No such user exists",
        },
      });
    }

    if (user.otp) {
      console.log("Email really not verified")
      return res.status(411).json({
        error: {
          message: "Email not verified",
        },
      });
    }

    const matchPassword = await validatePassword(
      data.password,
      user.passwordHash
    );

    if (!matchPassword) {
      return res.status(411).json({
        error: {
          message: "No such user exists",
        },
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
      error: {
        message: "An unexpected exception occurred!",
      },
    });
  }
};

export const userProfileController = async (
  req: UserAuthRequest,
  res: Response
) => {
  const userId = req.userId;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      username: true,
      posts: true,
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
