import commentModel from "../models/comment.model.js";
import postModel from "../models/post.model.js";
import asyncHandler from "../utils/async.handler.js";
import { ApiError } from "../utils/app.error.js";
import createCommentSchema from "../validators/comment.schema.js";

const addComment = asyncHandler(async (req, res) => {
  const { content } = createCommentSchema.parse(req.body);
  const post = await postModel.findById(req.params.postId);
  if (!post) throw new ApiError(404, "Post not found");

  const comment = await commentModel.create({
    post: post._id,
    author: req.user._id,
    content,
  });
  res.status(201).json({ comment });
});

const listComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await commentModel.find({ post: postId })
    .populate("author", "name role")
    .sort({ createdAt: -1 });
  res.json({ comments });
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await commentModel.findById(req.params.commentId);
  if (!comment) throw new ApiError(404, "Comment not found");
  // Only comment owner or admin can delete
  if (
    String(comment.author) !== String(req.user._id) &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "Insufficient permissions");
  }
  await comment.deleteOne();
  res.status(204).send();
});

export { addComment, listComments, deleteComment };