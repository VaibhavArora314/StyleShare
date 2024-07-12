import {Router} from 'express';
import { adminLoginController, adminProfileController, allUserForAdmin, blockUserController, unblockUserController, getAdminPostsController, getAdminTrendingPostsController, getAdminStatsController, updatePostController, deletePostController, getPostByIdController, getGraphsStatsController } from './controller';
import { isAdmin } from '../../middleware/adminAuth';

const adminRouter = Router();

adminRouter.post("/login", adminLoginController);

adminRouter.get("/me", isAdmin,adminProfileController );

adminRouter.patch('/block/:userId', isAdmin, blockUserController);

adminRouter.patch('/unblock/:userId', isAdmin, unblockUserController);

adminRouter.get('/allUsers',isAdmin,allUserForAdmin);

adminRouter.get("/posts/all", isAdmin,getAdminPostsController );

adminRouter.get("/posts/trending", isAdmin,getAdminTrendingPostsController );

adminRouter.get("/getCardStatus", isAdmin,getAdminStatsController );

adminRouter.get('/postbyid/:id', isAdmin,getPostByIdController);

adminRouter.patch('/posts/update/:postId', isAdmin, updatePostController);

adminRouter.delete('/posts/delete/:postId', isAdmin, deletePostController);

adminRouter.get("/getgraphsstatus", isAdmin,getGraphsStatsController);

export default adminRouter;