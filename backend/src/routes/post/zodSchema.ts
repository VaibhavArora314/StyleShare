import zod from "zod";

export const createPostSchema = zod.object({
    title: zod.string().min(3).max(30),
    description: zod.string().min(3).max(200),
    codeSnippet: zod.string().min(3).max(10000),
    jsCodeSnippet: zod.string().min(0).max(5000).optional().default(""),
    tags: zod.array(zod.string().min(2).max(20)).min(1).max(5),
});
