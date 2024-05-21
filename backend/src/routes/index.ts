import { Router } from "express";
import userRouter from "./user/route";
import postRouter from "./post/route";

const rootRouter = Router();
rootRouter.use('/user',userRouter); 
rootRouter.use('/posts',postRouter);

export default rootRouter;