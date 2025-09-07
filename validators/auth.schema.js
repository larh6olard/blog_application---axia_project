import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});

export { registerSchema, loginSchema };
