import {Router} from 'express';
import { adminLoginController, adminProfileController, getAdminPostsController, getAdminTrendingPostsController } from './controller';
import { isAdmin } from '../../middleware/adminAuth';

const adminRouter = Router();

adminRouter.post("/login", adminLoginController);

adminRouter.get("/me", isAdmin,adminProfileController );

adminRouter.get("/getAdminAllPosts", isAdmin,getAdminPostsController );

adminRouter.get("/getAdminAllTrendingPosts", isAdmin,getAdminTrendingPostsController );

export default adminRouter;