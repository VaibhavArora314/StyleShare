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

export const getPostByIdController = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      select: {
        id: true,
        title: true,
        codeSnippet: true,
        jsCodeSnippet: true,
        description: true,
        tags: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "No such post exists!",
      });
    }

    res.status(200).json({
      post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error!",
    });
  }
};

export const updatePostController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { postId } = req.params;
    const { title, description, codeSnippet, jsCodeSnippet, tags } = req.body;

    if (!userId) {
      return res.status(403).json({ error: "Invalid admin" });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        isAdmin: true,
      },
    });

    if (!user?.isAdmin) {
      return res.status(403).json({
        error: "User is not admin!",
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true
      },
    });

    if (!post) {
      return res.status(404).json({
        error: "Post not found!",
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        description,
        codeSnippet,
        jsCodeSnippet,
        tags,
      },
      select: {
        id: true,
        title: true,
        codeSnippet: true,
        jsCodeSnippet: true,
        description: true,
        tags: true,
      },
    });

    res.status(200).json({
      message: "Post updated successfully.",
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const deletePostController = async (req: UserAuthRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;
    
    if (!userId) {
      return res.status(403).json({ error: { message: "Invalid admin" } });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: { message: "Post not found" } });
    }

    await prisma.comment.deleteMany({
      where: { postId }
    });
    await prisma.favorite.deleteMany({
      where: { postId }
    });
    await prisma.reaction.deleteMany({
      where: { postId }
    });
    await prisma.post.delete({
      where: { id: postId },
    });

    res.status(200).json({
      message: "Post deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};