import { Request, Response } from "express";
import { UserAuthRequest } from "../../helpers/types";
import { createPostSchema } from "./zodSchema";
import prisma from "../../db";
import {GoogleGenerativeAI} from '@google/generative-ai'

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
        jsCodeSnippet: data.jsCodeSnippet,
        description: data.description,
        tags: data.tags,
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        codeSnippet: true,
        jsCodeSnippet: true,
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

export const updatePostController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const { title, codeSnippet, jsCodeSnippet, description, tags } = req.body;

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
        error: "User is not verified!",
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        error: "Post not found!",
      });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({
        error: "You are not authorized to update this post!",
      });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        codeSnippet,
        jsCodeSnippet,
        description,
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
      message: "Post updated successfully!",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected exception occurred!",
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
        jsCodeSnippet: true,
        description: true,
        tags: true,
        likes: true,
        dislikes: true,
        author: {
          select: {
            id: true,
            username: true,
            following: {
              select: {
                id: true
              }
            }
          },
        },
        comments: true
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "No such post exists!",
      });
    }

    const totalFollowers = post.author.following.length;

    res.status(200).json({
      post: {
        ...post,
        author: {
          ...post.author,
          totalFollowers,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error!",
    });
  }
};

export const getPostsController = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      codeSnippet: true,
      jsCodeSnippet: true,
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
    const searchQuery = req.query.searchQuery as string || "";
    const tags = req.query.tags ? (req.query.tags as string).split(',') : [];
    console.log(tags)

     const totalPosts = await prisma.post.count({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: searchQuery, mode: 'insensitive' } },
              { description: { contains: searchQuery, mode: 'insensitive' } }
            ]
          },
          tags.length > 0 ? { tags: { hasSome: tags } } : {}
        ]
      }
    });
    const totalPages = Math.ceil(totalPosts / pageSize);

    const posts = await prisma.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        codeSnippet: true,
        jsCodeSnippet: true,
        description: true,
        tags: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      where: {
        AND: [
          {
            OR: [
              { title: { contains: searchQuery, mode: 'insensitive' } },
              { description: { contains: searchQuery, mode: 'insensitive' } }
            ]
          },
          tags.length > 0 ? { tags: { hasSome: tags } } : {}
        ]
      }
    });
    res.status(200).json({
      posts,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getTrendingPostsController = async (req: Request, res: Response) => {
  try{
    const trendingPosts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        codeSnippet: true,
        jsCodeSnippet: true,
        description: true,
        tags: true,
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
            jsCodeSnippet: true,
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

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: { message: "An unexpected error occurred" } });
  }
};

const getCodeSnippetById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    select: { codeSnippet: true, jsCodeSnippet: true },
  });
  return {
    css: post?.codeSnippet || "",
    js: post?.jsCodeSnippet || "",
  };
};

export const aiCustomization = async (req: UserAuthRequest, res: Response) => {
  try {
    const { id, query } = req.body;

    if (!id || !query) {
      console.error("ID and query are required", { id, query });
      return res.status(400).json({ error: "ID and query are required" });
    }

    const originalSnippets = await getCodeSnippetById(id);

    if (!originalSnippets.css && !originalSnippets.js) {
      console.error("Code snippets not found for id:", id);
      return res.status(404).json({ error: "Code snippets not found" });
    }

    const key = process.env.API_KEY;
    if (!key) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const cssPrompt = `This is my Tailwind CSS code: ${originalSnippets.css}\n\n I want you to modify it and put ${query}\n\n and also write the code in VS Code format like one below another tag and just give me the code, don't explain it.`;
    const jsPrompt = `This is my JavaScript code: ${originalSnippets.js}\n\n I want you to modify it and put ${query}\n\n and also write the code in VS Code format like one below another tag and just give me the code, don't explain it.`;

    const cssResult = await model.generateContent(cssPrompt);
    const jsResult = await model.generateContent(jsPrompt);

    const cssResponse = await cssResult.response;
    const jsResponse = await jsResult.response;

    const cssText = cssResponse.text();
    const jsText = jsResponse.text();

    res.json({ css: cssText, js: jsText });

  } catch (error) {
    console.error('Failed to customize the code', error);
    res.status(500).json({ error: "Failed to customize the code" });
  }
};

export const reactToPostController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const { type } = req.body;

    if (!userId) {
      return res.status(403).json({ error: { message: "Invalid user" } });
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

    const existingReaction = await prisma.reaction.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingReaction) {
      const updatedReaction = await prisma.reaction.update({
        where: { id: existingReaction.id },
        data: { type },
      });
      res.status(200).json({ message: "Reaction updated", reaction: updatedReaction });
    } else {
      const newReaction = await prisma.reaction.create({
        data: {
          userId,
          postId,
          type,
        },
      });
      res.status(201).json({ message: "Reaction added", reaction: newReaction });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to react to the post" });
  }
};

export const removeReactionController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    if (!userId) {
      return res.status(403).json({ error: { message: "Invalid user" } });
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

    const existingReaction = await prisma.reaction.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingReaction) {
      await prisma.reaction.delete({
        where: { id: existingReaction.id },
      });
      res.status(200).json({ message: "Reaction removed" });
    } else {
      res.status(404).json({ error: "No reaction to remove" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to remove reaction" });
  }
};

export const getUserReactionController = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    if (!userId) {
      return res.status(403).json({ error: { message: "Invalid user" } });
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

    const reaction = await prisma.reaction.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (reaction) {
      res.status(200).json({ reaction });
    } else {
      res.status(404).json({ message: "No reaction found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reaction" });
  }
};

export const getPostReactionsController = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const reactions = await prisma.reaction.groupBy({
      by: ['type'],
      where: { postId },
      _count: {
        type: true,
      },
    });

    res.status(200).json({ reactions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reactions" });
  }
};

export const getAllTagsController = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        tags: true,
      },
    });

    const allTags = posts.flatMap(post => post.tags);
    const uniqueTags = Array.from(new Set(allTags));

    res.status(200).json({
      tags: uniqueTags,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch tags",
    });
  }
};