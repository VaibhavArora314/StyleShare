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
        comments:true
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

export const getPostsController = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
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

  res.status(200).json({
    posts,
  });
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
      message: "Post liked successful",
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
      message: "Post disliked successful",
      dislikes: post?.dislikes,
      likes: post?.likes
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to dislike the post."
    });
  }
};

export const createCommentController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { postId } = req.params;
    const { content } = req.body;

    if (!userId) {
      return res.status(403).json({ error: "Invalid user" });
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

    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        postId
      },
      select: {
        id: true,
        content: true,
        user: {
          select: {
            id: true,
            username: true,
          }
        },
        createdAt: true
      }
    });

    res.status(201).json({
      message: "Successfully created comment!",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const getCommentsController = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId },
      select: {
        id: true,
        content: true,
        user: {
          select: {
            id: true,
            username: true,
          }
        },
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    res.status(200).json({
      comments,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch comments",
    });
  }
};

export const favoritePostController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { verified: true }
    });

    if (!user?.verified) {
      return res.status(403).json({ error: "User is not verified!" });
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    if (favorite) {
      return res.status(400).json({ error: "You have already favorited this post." });
    }

    await prisma.favorite.create({
      data: {
        userId,
        postId
      }
    });

    res.status(200).json({ message: "Post favorited successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to favorite the post." });
  }
};

export const unfavoritePostController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { verified: true }
    });

    if (!user?.verified) {
      return res.status(403).json({ error: "User is not verified!" });
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    if (!favorite) {
      return res.status(400).json({ error: "You have not favorited this post." });
    }

    await prisma.favorite.delete({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    res.status(200).json({ message: "Post unfavorited successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unfavorite the post." });
  }
};

export const getFavoritePostsController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { verified: true },
    });

    if (!user?.verified) {
      return res.status(403).json({ error: 'User is not verified!' });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        post: {
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
        },
      },
    });

    const favoritePosts = favorites.map((fav) => fav.post);

    res.status(200).json({ favoritePosts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorite posts.' });
  }
};

export const getLeaderboardController = async (req: Request, res: Response) => {
  try {
    const leaderboard = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        _count: {
          select: { posts: true },
        },
        posts: {
          select: {
            likes: true,
          },
        },
      },
    });

    const userLikes = leaderboard.map((user) => ({
      id: user.id,
      username: user.username,
      postCount: user._count.posts,
      totalLikes: user.posts.reduce((sum, post) => sum + post.likes, 0),
    }));

    userLikes.sort((a, b) => b.totalLikes - a.totalLikes);

    const top10Users = userLikes.slice(0, 10);

    res.status(200).json({
      leaderboard: top10Users.map((user, index) => ({
        rank: index + 1,
        userId: user.id,
        username: user.username,
        postCount: user.postCount,
        totalLikes: user.totalLikes,
      })),
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch leaderboard.",
    });
  }
};

export const deletePostController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    if (!userId) {
      return res.status(403).json({ error: { message: "Invalid user" } });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: { message: "Post not found" } });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({ error: { message: "You are not authorized to delete this post" } });
    }

    await prisma.userPostInteraction.deleteMany({
      where: { postId }
    });
    await prisma.comment.deleteMany({
      where: { postId }
    });
    await prisma.favorite.deleteMany({
      where: { postId }
    });

    await prisma.post.delete({
      where: { id: postId },
    });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: { message: "An unexpected error occurred" } });
  }
};