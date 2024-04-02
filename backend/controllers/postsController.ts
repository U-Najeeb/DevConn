import { ObjectId } from "mongoose";
import Post from "../models/postModel";
import User from "../models/userModel";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import processImage from "../utils/imageProcessing";

interface customRequest extends Request {
  user: JwtPayload;
}

const createPost = catchAsync(
  async (req: customRequest, res: Response, _next: NextFunction) => {
    const userId = req.user._id;

    interface postBody {
      user: ObjectId;
      content: string;
      images: string[];
      likes: string[];
      comments: string[];
      tags: string[];
      type?: "code" | "text" | "event";
    }

    const body: postBody = req.body;
    const { content, likes, comments, tags, images, type } = body;

    try {
      const processedImages: string[] = [];

      await Promise.all(
        images.map(async (image) => {
          const processedImage = await processImage(image.split(",")[1]);
          processedImages.push(processedImage);
        })
      );

      const post = await Post.create({
        user: userId,
        content,
        images: processedImages,
        likes,
        comments,
        tags,
        type,
      });

      res.status(201).json({
        message: "Post created",
        post,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post" });
    }
  }
);

export default createPost;

const getPostsByUserId = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.params.id;
    const posts = await Post.find({ user: userId }).populate("user");
    res.status(200).json({
      message: `Posts by user ${userId} retrieved`,
      count: posts.length,
      posts,
    });
  }
);

const deletePostById = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const postId = req.params.id;
    await Post.findByIdAndDelete({ _id: postId });
    res.status(204).json({
      message: `Post ${postId} deleted`,
    });
  }
);
export { createPost, getPostsByUserId, deletePostById };
