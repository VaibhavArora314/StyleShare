import {Router} from 'express';
import { getPostReactionsController,getFavoritesController,adminLoginController, adminProfileController, allUserForAdmin, blockUserController, unblockUserController, getAdminPostsController, getAdminTrendingPostsController, getAdminStatsController, getGraphsStatsController, updatePostController, deletePostController, getPostByIdController, getAllContactMessages, deleteCommentController, downloadReportController, getFeedbacks, toggleFeedbackVisibility, downloadCommentsReportController, downloadFavoritesReportController, downloadReactionsReportController } from './controller';
import { isAdmin } from '../../middleware/adminAuth';

const adminRouter = Router();

adminRouter.post("/login", adminLoginController);

adminRouter.get("/me", isAdmin,adminProfileController );

adminRouter.patch('/block/:userId', isAdmin, blockUserController);

adminRouter.patch('/unblock/:userId', isAdmin, unblockUserController);

adminRouter.get('/allUsers',isAdmin,allUserForAdmin);

adminRouter.get("/posts/all", isAdmin,getAdminPostsController );

adminRouter.get("/posts/trending", isAdmin,getAdminTrendingPostsController );

adminRouter.get("/getCardStatus", isAdmin,getAdminStatsController );

adminRouter.get("/getgraphsstatus", isAdmin,getGraphsStatsController);

adminRouter.get('/postbyid/:id', isAdmin,getPostByIdController);

adminRouter.patch('/posts/update/:postId', isAdmin, updatePostController);

adminRouter.delete('/posts/delete/:postId', isAdmin, deletePostController);

adminRouter.get("/geallcontactmessages", isAdmin,getAllContactMessages);

adminRouter.delete('/comments/delete/:commentId', isAdmin, deleteCommentController);

adminRouter.get('/getreactions', isAdmin, getPostReactionsController);

adminRouter.get('/favorites', isAdmin, getFavoritesController);

adminRouter.get('/downloadReport',isAdmin, downloadReportController);

adminRouter.get('/getfeedback',isAdmin, getFeedbacks);

adminRouter.patch('/toggleFeedbackVisibility/:id', isAdmin, toggleFeedbackVisibility);

adminRouter.get("/downloaduserscommentsreport", downloadCommentsReportController);

adminRouter.get("/downloadusersfavoritesreport", downloadFavoritesReportController);

adminRouter.get("/downloadusersreactionreport", downloadReactionsReportController);

export default adminRouter;