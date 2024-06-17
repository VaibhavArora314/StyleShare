
import { Router } from "express";
import authMiddleware from "../../middleware/auth"
import { addReactionController, aiCustomization, createCommentController, createPostController, deletePostController, dislikePostController, favoritePostController, getCommentsController, getFavoritePostsController, getLeaderboardController, getPostController, getPostsWithPagination, getReactionsController, likePostController, removeReactionController, unfavoritePostController, updatePostController } from "./controller";

const postRouter = Router();

postRouter.get('/', getPostsWithPagination);

postRouter.get('/lead', getPostController);

postRouter.post('/', authMiddleware, createPostController)

postRouter.put('/:id', authMiddleware, updatePostController);

postRouter.get('/:id', getPostController);

postRouter.post('/:id/like', authMiddleware, likePostController);

postRouter.post('/:id/dislike', authMiddleware, dislikePostController);

postRouter.post('/:postId/comments', authMiddleware, createCommentController);

postRouter.get('/:postId/comments', getCommentsController);

postRouter.post('/:id/favorite', authMiddleware, favoritePostController);

postRouter.post('/:id/unfavorite', authMiddleware, unfavoritePostController);

postRouter.get('/:id/favorites', authMiddleware, getFavoritePostsController);

postRouter.get('/all/leaderboard', getLeaderboardController);

postRouter.delete('/delete/:id', authMiddleware, deletePostController); 

postRouter.post('/customize',aiCustomization);

postRouter.post('/:id/reaction', authMiddleware, addReactionController);

postRouter.delete('/:id/reaction/:type', authMiddleware, removeReactionController);

postRouter.get('/:id/reactions', getReactionsController);

export default postRouter;