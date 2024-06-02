import { Router } from "express";
import {
  generateOtpController,
  userProfileController,
  userSigninController,
  userSignupController,
  verifyOtpController,
} from "./controller";
import authMiddleware from "../../middleware/auth";

const userRouter = Router();

userRouter.post("/signup", userSignupController);

userRouter.post("/signin", userSigninController);

userRouter.post("/generate-otp", authMiddleware, generateOtpController);

userRouter.post("/verify-otp", authMiddleware, verifyOtpController);

userRouter.get("/me", authMiddleware, userProfileController);

export default userRouter;
