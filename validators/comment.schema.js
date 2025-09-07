import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1),
});

export default createCommentSchema;
