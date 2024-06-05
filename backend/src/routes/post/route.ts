
import { Router } from "express";
import authMiddleware from "../../middleware/auth"
import { createPostController, dislikePostController, getPostController, getPostsWithPagination, likePostController } from "./controller";

const postRouter = Router();

postRouter.get('/', getPostsWithPagination);

postRouter.post('/', authMiddleware, createPostController)

postRouter.get('/:id', getPostController);

postRouter.post('/:id/like', authMiddleware, likePostController);

postRouter.post('/:id/dislike', authMiddleware, dislikePostController);

export default postRouter;