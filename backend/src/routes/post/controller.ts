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
        error: { message: "Invalid user" },
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        verified: true,
      },
    });

    if (!user?.verified) {
      return res.status(403).json({
        error: { message: "User is not verified!" },
      });
    }

    const result = createPostSchema.safeParse(payload);

    if (!result.success) {
      const formattedError: any = {};
      result.error.errors.forEach((e) => {
        formattedError[e.path[0]] = e.message;
      });
      return res.status(411).json({
        error: { ...formattedError, message: "Invalid Inputs" },
      });
    }

    const data = result.data;

    const post = await prisma.post.create({
      data: {
        title: data.title,
        codeSnippet: data.codeSnippet,
        description: data.description,
        tags: data.tags,
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        codeSnippet: true,
        description: true,
        tags: true,
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
      error: {
        message: "An unexpected exception occurred!",
      },
    });
  }
};

// export const getPostsController = async (req: Request, res: Response) => {
//   const posts = await prisma.post.findMany({
//     select: {
//       id: true,
//       title: true,
//       codeSnippet: true,
//       description: true,
//       tags: true,
//       author: {
//         select: {
//           id: true,
//           username: true,
//           email: true,
//         },
//       },
//     },
//   });

//   res.status(200).json({
//     posts,
//   });
// };

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
        codeSnippet: true,
        description: true,
        tags: true,
        likes:true,
        dislikes:true,
        author: {
          select: {
            id: true,
            username: true,
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
      error: "No such post exists!",
    });
  }
};

export const getPostsWithPagination = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string); 

    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts / pageSize);

    const posts = await prisma.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        codeSnippet: true,
        description: true,
        tags: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.status(200).json({
      posts,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const likePostController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const interaction = await prisma.userPostInteraction.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    if (interaction) {
      if (interaction.liked) {
        return res.status(400).json({ error: "You have already liked this post." });
      } else {
        await prisma.userPostInteraction.update({
          where: { id: interaction.id },
          data: { liked: true, disliked: false }
        });
        await prisma.post.update({
          where: { id: postId },
          data: {
            likes: { increment: 1 },
            dislikes: interaction.disliked ? { decrement: 1 } : undefined
          }
        });
      }
    } else {
      await prisma.userPostInteraction.create({
        data: {
          userId,
          postId,
          liked: true,
          disliked: false
        }
      });
      await prisma.post.update({
        where: { id: postId },
        data: { likes: { increment: 1 } }
      });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { likes: true, dislikes: true }
    });

    res.status(200).json({
      message: "Post liked successfully!",
      likes: post?.likes,
      dislikes: post?.dislikes
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to like the post."
    });
  }
};

export const dislikePostController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const interaction = await prisma.userPostInteraction.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    if (interaction) {
      if (interaction.disliked) {
        return res.status(400).json({ error: "You have already disliked this post." });
      } else {
        await prisma.userPostInteraction.update({
          where: { id: interaction.id },
          data: { liked: false, disliked: true }
        });
        await prisma.post.update({
          where: { id: postId },
          data: {
            dislikes: { increment: 1 },
            likes: interaction.liked ? { decrement: 1 } : undefined
          }
        });
      }
    } else {
      await prisma.userPostInteraction.create({
        data: {
          userId,
          postId,
          liked: false,
          disliked: true
        }
      });
      await prisma.post.update({
        where: { id: postId },
        data: { dislikes: { increment: 1 } }
      });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { dislikes: true, likes: true }
    });

    res.status(200).json({
      message: "Post disliked successfully!",
      dislikes: post?.dislikes,
      likes: post?.likes
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to dislike the post."
    });
  }
};
