import express from "express";
import { ApiError } from "../utils/app.error.js";
import { updatePost, deletePost } from "../controllers/post.controller.js";
import postModel from "../models/post.model.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Fetch post + enforce owner or admin
const loadPostAndAuthorize = async (req, _res, next) => {
  const post = await postModel.findById(req.params.id);
  if (!post) return next(new ApiError(404, "Post not found"));
  if (
    String(post.author) !== String(req.user._id) &&
    req.user.role !== "admin"
  ) {
    return next(new ApiError(403, "Insufficient permissions"));
  }
  req.post = post;
  next();
};

router.patch("/:id", auth, loadPostAndAuthorize, updatePost);
router.delete("/:id", auth, loadPostAndAuthorize, deletePost);

export default router;