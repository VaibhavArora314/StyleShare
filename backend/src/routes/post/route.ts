
import { Router } from "express";
import authMiddleware from "../../middleware/auth"
import { createCommentController, createPostController, dislikePostController, favoritePostController, getCommentsController, getFavoritePostsController, getPostController, getPostsWithPagination, likePostController, unfavoritePostController } from "./controller";

const postRouter = Router();

postRouter.get('/', getPostsWithPagination);

postRouter.post('/', authMiddleware, createPostController)

postRouter.get('/:id', getPostController);

postRouter.post('/:id/like', authMiddleware, likePostController);

postRouter.post('/:id/dislike', authMiddleware, dislikePostController);

postRouter.post('/:postId/comments', authMiddleware, createCommentController);

postRouter.get('/:postId/comments', getCommentsController);

postRouter.post('/:id/favorite', authMiddleware, favoritePostController);

postRouter.post('/:id/unfavorite', authMiddleware, unfavoritePostController);

postRouter.get('/:id/favorites', authMiddleware, getFavoritePostsController);

export default postRouter;