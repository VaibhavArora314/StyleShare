
import { Router } from "express";
import authMiddleware from "../../middleware/auth"
import { aiCustomization, createCommentController, createPostController, deletePostController, favoritePostController, getCommentsController, getFavoritePostsController, getLeaderboardController, getPostController, getPostReactionsController, getPostsWithPagination, getUserReactionController, reactToPostController, removeReactionController, unfavoritePostController, updatePostController } from "./controller";

const postRouter = Router();

postRouter.get('/', getPostsWithPagination);

postRouter.get('/lead', getPostController);

postRouter.post('/', authMiddleware, createPostController)

postRouter.put('/:id', authMiddleware, updatePostController);

postRouter.get('/:id', getPostController);

postRouter.post('/:postId/comments', authMiddleware, createCommentController);

postRouter.get('/:postId/comments', getCommentsController);

postRouter.post('/:id/favorite', authMiddleware, favoritePostController);

postRouter.post('/:id/unfavorite', authMiddleware, unfavoritePostController);

postRouter.get('/:id/favorites', authMiddleware, getFavoritePostsController);

postRouter.get('/all/leaderboard', getLeaderboardController);

postRouter.delete('/delete/:id', authMiddleware, deletePostController); 

postRouter.post('/customize',aiCustomization);

postRouter.post('/:id/react', authMiddleware, reactToPostController);

postRouter.delete('/:id/react', authMiddleware, removeReactionController);

postRouter.get('/:id/reaction', authMiddleware, getUserReactionController);

postRouter.get('/:id/reactions', getPostReactionsController);

export default postRouter;