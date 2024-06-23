import { Router } from "express";
import {
  checkFollowStatusController,
  contactUsController,
  followUserController,
  generateOtpController,
  showUserProfileController,
  unfollowUserController,
  userProfileController,
  userSigninController,
  userSignupController,
  verifyOtpController,google
} from "./controller";
import authMiddleware from "../../middleware/auth";

const userRouter = Router();

userRouter.post("/signup", userSignupController);

userRouter.post("/signin", userSigninController);

userRouter.post("/google",google);
userRouter.post("/generate-otp", authMiddleware, generateOtpController);

userRouter.post("/verify-otp", authMiddleware, verifyOtpController);

userRouter.get("/me", authMiddleware, userProfileController);

userRouter.post("/contact-us", contactUsController);

userRouter.get("/profile/:id", showUserProfileController);

userRouter.post("/:id/follow", authMiddleware, followUserController);

userRouter.post("/:id/unfollow", authMiddleware, unfollowUserController);

userRouter.get("/:id/follow-status", authMiddleware, checkFollowStatusController);

export default userRouter;
