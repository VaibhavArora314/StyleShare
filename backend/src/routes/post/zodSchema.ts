import zod from "zod";

export const createPostSchema = zod.object({
    title: zod.string().min(3).max(30),
    content: zod.string().min(3).max(1000)
})