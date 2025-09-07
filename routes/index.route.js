import { Router } from "express";
import authRoutes from "../routes/auth.route.js";
import postRoutes from "../routes/post.route.js";
import commentRoutes from "../routes/comment.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
// Nested comments under posts
router.use("/posts/:postId/comments", commentRoutes);

export default router;