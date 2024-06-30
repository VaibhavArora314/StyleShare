import {Router} from 'express';
import { adminLoginController, adminProfileController } from './controller';
import { isAdmin } from '../../middleware/adminAuth';

const adminRouter = Router();

adminRouter.post("/login", adminLoginController);

adminRouter.get("/me", isAdmin,adminProfileController );

export default adminRouter;