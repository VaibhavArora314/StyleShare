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

export const UpdateBodySchema = zod.object({
  username: zod
      .string()
      .min(5, { message: "Username too short!" })
      .max(30, { message: "Username too long!" }),
  email: zod.string().email().max(80, { message: "Email too long!" }),
  twitter: zod.string().url().optional().or(zod.literal('')),
  github: zod.string().url().optional().or(zod.literal('')),
  linkedin: zod.string().url().optional().or(zod.literal('')),
  portfolio: zod.string().url().optional().or(zod.literal('')),
  avatar: zod.string().optional().or(zod.literal('')),
})

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

export const contactUsSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email("Invalid email address"), 
  subject: zod.string().min(1, "Subject is required"),
  message: zod.string().min(1, "Message is required"),
});