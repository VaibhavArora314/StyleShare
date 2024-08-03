import { Request, Response } from "express";
import prisma from "../../db";
import { adminLoginSchema } from './zodSchema';
import { createJWT } from "../../helpers/jwt";
import { validatePassword } from "../../helpers/hash";
import { UserAuthRequest } from "../../helpers/types";
import PDFDocument from 'pdfkit';

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
        avatar:true,
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
      createdAt: true,
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              email: true,
              avatar:true
            },
          },
        },
      },
      reactions: true,
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

export const getGraphsStatsController = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        createdAt: true,
      },
    });
    const posts = await prisma.post.findMany({
      select: {
        createdAt: true,
      },
    });
    const comments = await prisma.comment.findMany({
      select: {
        createdAt: true,
      },
    });
    const favorites = await prisma.favorite.findMany({
      select: {
        createdAt:true
      },
    });
    const contacts = await prisma.contactMessage.findMany({
      select: {
        createdAt:true
      },
    });
    const reactions = await prisma.reaction.findMany({
      select: {
        createdAt:true
      },
    });

    res.status(200).json({
      users,
      posts,
      comments,
      favorites,
      contacts,
      reactions
    });
  } catch (error) {
    console.log(error)
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

export const getAllContactMessages = async (req: Request, res: Response) => {
  try{
    const contactMessage = await prisma.contactMessage.findMany({
      select: {
        id: true,
        name:true,
        email:true,
        subject:true,
        message:true,
        createdAt:true
      },
    });
    res.status(200).json({
      message: "Successfully fetched contact messages!",
      contactMessage,
    });
  }catch(error){
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const deleteCommentController = async (req: UserAuthRequest, res: Response) => {
  try {
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: { message: "Comment not found" } });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const getPostReactionsController = async (req: Request, res: Response) => {
  try {
    const reactions = await prisma.reaction.findMany({
      select: {
        type: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar:true
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            description: true,
            author: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      message: "Successfully fetched all reactions!",
      reactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const getFavoritesController = async (req: Request, res: Response) => {
  try {
    const favorites = await prisma.favorite.findMany({
      select: {
        id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar:true
          }
        },
        post: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      message: "Successfully fetched favorite posts!",
      favorites,
    });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const downloadReportController = async (req: UserAuthRequest, res: Response) => {
  try {
    const currentDate = new Date().toLocaleDateString();

    const totalUsers = await prisma.user.count();
    const totalPosts = await prisma.post.count();
    const totalComments = await prisma.comment.count();
    const totalReactions = await prisma.reaction.count();
    const contactMessages = await prisma.contactMessage.count();
    const favoritePosts = await prisma.favorite.count();

    const trendingPosts = await prisma.post.findMany({
      orderBy: {
        reactions: {
          _count: 'desc',
        },
      },
      take: 5,
      select: {
        title: true
      },
    });

    const newPosts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      select: {
        title: true,
      },
    });
    
    const doc = new PDFDocument();
    let filename = `StyleShare_Report.pdf`;
    filename = encodeURIComponent(filename);

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(25).text('StyleShare Web App Report', {
      align: 'center'
    });

    
    doc.moveDown();
    doc.fontSize(20).text('Overview',{
      align: 'center'
    });
    doc.moveDown();
    doc.fontSize(15).text(`Date: ${currentDate}`);
    doc.moveDown();

    doc.fontSize(12).text(`Total Users: ${totalUsers}`);
    doc.text(`Total Posts: ${totalPosts}`);
    doc.text(`Total Comments: ${totalComments}`);
    doc.text(`Total Reactions: ${totalReactions}`);
    doc.text(`Total Contact Messages: ${contactMessages}`);
    doc.text(`Total Favorite Posts: ${favoritePosts}`);
    doc.moveDown();

    doc.moveDown();
    doc.fontSize(15).text('Top Trending Posts');
    doc.moveDown();

    trendingPosts.forEach((post, index) => {
      doc.fontSize(12).text(`${index + 1}. ${post.title}`);
    });

    doc.moveDown();
    doc.fontSize(15).text('Newest Posts');
    doc.moveDown();

    newPosts.forEach((post, index) => {
      doc.fontSize(12).text(`${index + 1}. ${post.title}`);
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const getFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'An unexpected error occurred!' });
  }
};

export const toggleFeedbackVisibility = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: { visible: !feedback.visible },
    });

    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error('Error toggling feedback visibility:', error);
    res.status(500).json({ error: 'An unexpected error occurred!' });
  }
};

export const downloadCommentsReportController = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date().toLocaleDateString();

    const comments = await prisma.comment.findMany({
      select: {
        content: true,
        createdAt: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        post: {
          select: {
            title: true,
          },
        },
      },
    });

    const totalComments = comments.length;

    const doc = new PDFDocument();
    let filename = `StyleShare_Comments_Report.pdf`;
    filename = encodeURIComponent(filename);

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(25).text('StyleShare Comments Report', {
      align: 'center'
    });

    doc.moveDown();
    doc.fontSize(20).text('Overview', {
      align: 'center'
    });
    doc.moveDown();
    doc.fontSize(15).text(`Date: ${currentDate}`);
    doc.moveDown();

    doc.fontSize(12).text(`Total Comments: ${totalComments}`);
    doc.moveDown();

    doc.fontSize(15).text('Comment Details:');
    doc.moveDown();

    comments.forEach(comment => {
      doc.text(`Content: ${comment.content}`);
      doc.text(`Created At: ${comment.createdAt.toLocaleDateString()}`);
      doc.text(`User: ${comment.user.username} (${comment.user.email})`);
      doc.text(`Post: ${comment.post.title}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const downloadReactionsReportController = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date().toLocaleDateString();

    const reactions = await prisma.reaction.findMany({
      select: {
        type: true,
        createdAt: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        post: {
          select: {
            title: true,
            description: true,
            author: {
              select: {
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    const totalReactions = reactions.length;

    const doc = new PDFDocument();
    let filename = `StyleShare_Reactions_Report.pdf`;
    filename = encodeURIComponent(filename);

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(25).text('StyleShare Reactions Report', {
      align: 'center'
    });

    doc.moveDown();
    doc.fontSize(20).text('Overview', {
      align: 'center'
    });
    doc.moveDown();
    doc.fontSize(15).text(`Date: ${currentDate}`);
    doc.moveDown();

    doc.fontSize(12).text(`Total Reactions: ${totalReactions}`);
    doc.moveDown();

    doc.fontSize(15).text('Reaction Details:');
    doc.moveDown();

    reactions.forEach(reaction => {
      doc.fontSize(12).text(`Type: ${reaction.type}`);
      doc.text(`Created At: ${reaction.createdAt.toLocaleDateString()}`);
      doc.text(`User: ${reaction.user.username} (${reaction.user.email})`);
      doc.text(`Post: ${reaction.post.title}`);
      doc.text(`Post Description: ${reaction.post.description}`);
      doc.text(`Post Author: ${reaction.post.author.username} (${reaction.post.author.email})`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};

export const downloadFavoritesReportController = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date().toLocaleDateString();

    const favorites = await prisma.favorite.findMany({
      select: {
        createdAt: true,
        user: {
          select: {
            username: true,
            email: true
          }
        },
        post: {
          select: {
            title: true,
            description: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const totalFavorites = favorites.length;

    const doc = new PDFDocument();
    let filename = `StyleShare_Favorites_Report.pdf`;
    filename = encodeURIComponent(filename);

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(25).text('StyleShare Favorites Report', {
      align: 'center'
    });

    doc.moveDown();
    doc.fontSize(20).text('Overview', {
      align: 'center'
    });
    doc.moveDown();
    doc.fontSize(15).text(`Date: ${currentDate}`);
    doc.moveDown();

    doc.fontSize(12).text(`Total Favorites: ${totalFavorites}`);
    doc.moveDown();

    doc.fontSize(15).text('Favorite Details:');
    doc.moveDown();

    favorites.forEach(favorite => {
      doc.text(`Created At: ${favorite.createdAt.toLocaleDateString()}`);
      doc.text(`User: ${favorite.user.username} (${favorite.user.email})`);
      doc.text(`Post: ${favorite.post.title}`);
      doc.text(`Post Description: ${favorite.post.description}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An unexpected exception occurred!",
    });
  }
};