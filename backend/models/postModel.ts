import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    tags: [{ type: String }],
    type: { type: String, enum: ["code", "text", "event"], default: "text" },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
