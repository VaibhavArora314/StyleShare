import {Router} from 'express';
import { adminLoginController, adminProfileController, getAdminStatsController } from './controller';
import { isAdmin } from '../../middleware/adminAuth';

const adminRouter = Router();

adminRouter.post("/login", adminLoginController);

adminRouter.get("/me", isAdmin,adminProfileController );

adminRouter.get("/getCardStatus", isAdmin,getAdminStatsController );

export default adminRouter;