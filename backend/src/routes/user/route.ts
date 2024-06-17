import { Router } from "express";
import {
  contactUsController,
  generateOtpController,
  showUserProfileController,
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

userRouter.post("/contact-us", contactUsController);

userRouter.get("/profile/:id", showUserProfileController);

export default userRouter;
