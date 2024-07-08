import {Router} from 'express';
import { adminLoginController, adminProfileController, allUserForAdmin, blockUserController, unblockUserController, getAdminStatsController } from './controller';
import { isAdmin } from '../../middleware/adminAuth';

const adminRouter = Router();

adminRouter.post("/login", adminLoginController);

adminRouter.get("/me", isAdmin,adminProfileController );

adminRouter.patch('/block/:userId', isAdmin, blockUserController);

adminRouter.patch('/unblock/:userId', isAdmin, unblockUserController);

adminRouter.get('/allUsers',isAdmin,allUserForAdmin);

adminRouter.get("/getCardStatus", isAdmin,getAdminStatsController );

export default adminRouter;