import {Router} from 'express';
import { adminLoginController, adminProfileController, getAdminPostsController, getAdminTrendingPostsController } from './controller';
import { isAdmin } from '../../middleware/adminAuth';

const adminRouter = Router();

adminRouter.post("/login", adminLoginController);

adminRouter.get("/me", isAdmin,adminProfileController );

adminRouter.get("/posts/all", isAdmin,getAdminPostsController );

adminRouter.get("/posts/trending", isAdmin,getAdminTrendingPostsController );

export default adminRouter;