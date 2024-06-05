
import { Router } from "express";
import authMiddleware from "../../middleware/auth"
import { createCommentController, createPostController, dislikePostController, getCommentsController, getPostController, getPostsWithPagination, likePostController } from "./controller";

const postRouter = Router();

postRouter.get('/', getPostsWithPagination);

postRouter.post('/', authMiddleware, createPostController)

postRouter.get('/:id', getPostController);

postRouter.post('/:id/like', authMiddleware, likePostController);

postRouter.post('/:id/dislike', authMiddleware, dislikePostController);

postRouter.post('/:postId/comments', authMiddleware, createCommentController);

postRouter.get('/:postId/comments', getCommentsController);

export default postRouter;