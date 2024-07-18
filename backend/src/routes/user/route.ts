import { Router } from "express";
import {
  checkFollowStatusController,
  checkingBlockOrUnblock,
  contactUsController,
  followUserController,
  generateOtpController,
  showUserProfileController,
  unfollowUserController,
  userProfileController,
  userSigninController,
  userSignupController,
  verifyOtpController,
  userProfileUpdate,
  googleAuthController
} from "./controller";
import authMiddleware from "../../middleware/auth";

const userRouter = Router();

userRouter.post("/signup", userSignupController);
userRouter.post("/google", googleAuthController,authMiddleware);

userRouter.post("/signin", userSigninController);

userRouter.post("/generate-otp", authMiddleware, generateOtpController);

userRouter.post("/verify-otp", authMiddleware, verifyOtpController);

userRouter.get("/me", authMiddleware, userProfileController);

userRouter.put("/update/:id",  userProfileUpdate);

userRouter.post("/contact-us", contactUsController);

userRouter.get("/profile/:id", showUserProfileController);

userRouter.post("/:id/follow", authMiddleware, followUserController);

userRouter.post("/:id/unfollow", authMiddleware, unfollowUserController);

userRouter.get("/:id/follow-status", authMiddleware, checkFollowStatusController);

userRouter.get('/checkBlockedOrUnblock',authMiddleware,checkingBlockOrUnblock);

export default userRouter;