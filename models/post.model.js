import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    body: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String, trim: true }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

postSchema.index({ title: "text", body: "text", tags: 1 });

const postModel = mongoose.model("Post", postSchema);

export default postModel;
