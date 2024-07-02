import { Router } from "express";
import userRouter from "./user/route";
import postRouter from "./post/route";
import adminRouter from "./admin/route"

const rootRouter = Router();
rootRouter.use('/user',userRouter); 
rootRouter.use('/posts',postRouter);
rootRouter.use('/admin',adminRouter);

export default rootRouter;