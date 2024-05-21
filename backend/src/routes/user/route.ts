import { Router } from "express";
import { userProfileController, userSigninController, userSignupController } from "./controller";
import authMiddleware from "../../middleware/auth"

const userRouter = Router();

userRouter.post('/signup', userSignupController)

userRouter.post('/signin', userSigninController)

userRouter.get('/me', authMiddleware, userProfileController);

export default userRouter;