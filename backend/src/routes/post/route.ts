import { Router } from "express";
import authMiddleware from "../../middleware/auth"
import { createPostController, getPostController, getPostsController } from "./controller";

const postRouter = Router();

postRouter.get('/', getPostsController)

postRouter.post('/', authMiddleware, createPostController)

postRouter.get('/:id', getPostController);

export default postRouter;