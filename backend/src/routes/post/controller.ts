import { Request, Response } from "express";
import { UserAuthRequest } from "../../helpers/types";
import { createPostSchema } from "./zodSchema";
import prisma from "../../db";

export const createPostController = async (
  req: UserAuthRequest,
  res: Response
) => {
  try {
    const payload = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(403).json({
        error: "Invalid user",
      });
    }

    const result = createPostSchema.safeParse(payload);

    if (!result.success) {
      return res.status(411).json({
        error: result.error.errors,
      });
    }

    const data = result.data;

    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Successfully created post!",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const getPostsController = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
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

export const getPostController = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;

        const post = await prisma.post.findFirst({
          where: {
            id: postId,
          },
          select: {
            id: true,
            title: true,
            content: true,
            author: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        });
      
        if (!post) {
          res.status(404).json({
            message: "No such post exists!",
          });
        }
      
        res.status(200).json({
          post,
        });
    } catch (error) {
        res.status(411).json({
            error: "Invalid id"
        })
    }

};
