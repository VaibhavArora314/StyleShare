import { Router } from "express";
import authMiddleware from "../../middleware/auth"
import { createPostController, getPostController, getPostsWithPagination } from "./controller";

const postRouter = Router();

postRouter.get('/', getPostsWithPagination);

postRouter.post('/', authMiddleware, createPostController)

postRouter.get('/:id', getPostController);

export default postRouter;