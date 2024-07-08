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
      return res.status(400).json({ error: { message: "No such admin exists" } });
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
      email: true,
      isAdmin:true
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

export const blockUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { blocked: true },
    });

    res.status(200).json({
      message: `User ${user.username} has been blocked.`,
    });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const unblockUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { blocked: false },
    });

    res.status(200).json({
      message: `User ${user.username} has been unblocked.`,
    });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const allUserForAdmin = async (req: Request, res:Response) => {
  try{
    const allUsers = await prisma.user.findMany({
      where: {
        isAdmin:false
      },
      select: {
        id:true,
        username:true,
        email:true,
        blocked:true,
        posts:true,
        createdAt:true,
        comments:true,
        following: {
          select: {
            id: true
          }
        }
      },
    });
    res.status(200).json({
      message: "Successfully fetched All Users!",
      allUsers,
    });
  }catch(error){
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
}

export const getAdminPostsController = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      codeSnippet: true,
      jsCodeSnippet: true,
      description: true,
      tags: true,
      createdAt:true,
      comments:true,
      reactions:true,
      author: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });

  res.status(200).json({
    posts,
  });
};

export const getAdminTrendingPostsController = async (req: Request, res: Response) => {
  try{
    const trendingPosts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        codeSnippet: true,
        jsCodeSnippet: true,
        description: true,
        tags: true,
        likes:true,
        createdAt:true,
        comments:true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        reactions:true,
      },
    });
    res.status(200).json({
      message: "Successfully created comment!",
      trendingPosts,
    });


  }catch(error){
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const getAdminStatsController = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalPosts = await prisma.post.count();
    const totalComments = await prisma.comment.count();
    const totalReactions = await prisma.reaction.count();
    const contactMessages = await prisma.contactMessage.count();
    const favoritesPosts = await prisma.favorite.count();

    res.status(200).json({
      totalUsers,
      totalPosts,
      totalComments,
      totalReactions,
      contactMessages,
      favoritesPosts
    });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};
