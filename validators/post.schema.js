import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
  body: z.string().min(10),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

const updatePostSchema = createPostSchema.partial();

export { createPostSchema, updatePostSchema };
