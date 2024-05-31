import zod from "zod";

export const signupBodySchema = zod.object({
  username: zod
    .string()
    .min(5, { message: "Username too short!" })
    .max(30, { message: "Username too long!" }),
  email: zod.string().email().max(80, { message: "Email too long!" }),
  password: zod
    .string()
    .min(8, { message: "Password too short!" })
    .max(30, { message: "Password too long!" }),
});

export const signinBodySchema = zod.object({
  email: zod.string().email().max(80, { message: "Email too long!" }),
  password: zod
    .string()
    .min(8, { message: "Password too short!" })
    .max(30, { message: "Password too long!" }),
});

export const otpVerificationSchema = zod.object({
  otp: zod.number(),
});
