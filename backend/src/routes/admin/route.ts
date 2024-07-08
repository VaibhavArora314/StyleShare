import {Router} from 'express';
import { adminLoginController, adminProfileController, allUserForAdmin, blockUserController, unblockUserController, getAdminPostsController, getAdminTrendingPostsController } from './controller';
import { isAdmin } from '../../middleware/adminAuth';

const adminRouter = Router();

adminRouter.post("/login", adminLoginController);

adminRouter.get("/me", isAdmin,adminProfileController );

adminRouter.patch('/block/:userId', isAdmin, blockUserController);

adminRouter.patch('/unblock/:userId', isAdmin, unblockUserController);

adminRouter.get('/allUsers',isAdmin,allUserForAdmin);

adminRouter.get("/posts/all", isAdmin,getAdminPostsController );

adminRouter.get("/posts/trending", isAdmin,getAdminTrendingPostsController );

export default adminRouter;