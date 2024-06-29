import zod from "zod";

export const adminLoginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});