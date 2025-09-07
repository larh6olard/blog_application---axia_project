import { Router } from "express";
import {
  addComment,
  listComments,
  deleteComment,
} from "../controllers/comment.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router({ mergeParams: true });

// Public: read comments of a post
router.get("/", listComments);

// Auth: add and delete
router.post("/", auth, addComment);
router.delete("/:commentId", auth, deleteComment);

export default router;
