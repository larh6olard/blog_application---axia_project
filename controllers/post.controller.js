import postModel from "../models/post.model.js";
import asyncHandler from "../utils/async.handler.js";
import { ApiError } from "../utils/app.error.js";
import {
  createPostSchema,
  updatePostSchema,
} from "../validators/post.schema.js";

const createPost = asyncHandler(async (req, res) => {
  const data = createPostSchema.parse(req.body);
  const post = await postModel.create({ ...data, author: req.user._id });
  res.status(201).json({ post });
});

const listPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, q } = req.query;
  const filter = q ? { $text: { $search: q } } : {};
  const [posts, total] = await Promise.all([
    Post.find(filter)
      .populate("author", "name role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    Post.countDocuments(filter),
  ]);
  res.json({ posts, page: Number(page), total });
});

const getPost = asyncHandler(async (req, res) => {
  const post = await postModel.findById(req.params.id).populate(
    "author",
    "name role"
  );
  if (!post) throw new ApiError(404, "Post not found");
  res.json({ post });
});

const updatePost = asyncHandler(async (req, res) => {
  const data = updatePostSchema.parse(req.body);
  const post = await postModel.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");

  // Ownership enforced by route middleware for non-admins
  Object.assign(post, data);
  await post.save();
  res.json({ post });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");
  await post.deleteOne();
  res.status(204).send();
});

export { createPost, listPosts, getPost, updatePost };