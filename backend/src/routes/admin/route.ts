import {Router} from 'express';
import { adminLoginController, adminProfileController, allUserForAdmin, blockUserController, unblockUserController, getAdminPostsController, getAdminTrendingPostsController, getAdminStatsController, getGraphsStatsController, updatePostController, deletePostController, getPostByIdController, getAllContactMessages } from './controller';
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

adminRouter.get("/getgraphsstatus", isAdmin,getGraphsStatsController);

adminRouter.get('/postbyid/:id', isAdmin,getPostByIdController);

adminRouter.patch('/posts/update/:postId', isAdmin, updatePostController);

adminRouter.delete('/posts/delete/:postId', isAdmin, deletePostController);

adminRouter.get("/geallcontactmessages", isAdmin,getAllContactMessages);

export default adminRouter;