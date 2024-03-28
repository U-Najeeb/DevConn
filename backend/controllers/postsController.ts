import { ObjectId } from "mongoose";
import Post from "../models/postModel";
import User from "../models/userModel";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

interface customRequest extends Request {
  user: JwtPayload;
}

const createPost = catchAsync(
  async (req: customRequest, res: Response, _next: NextFunction) => {
    const userId = req.user._id;

    interface postBody {
      user: ObjectId;
      content: string;
      likes: string[];
      comments: string[];
      tags: string[];
    }

    const body: postBody = req.body;
    const { content, likes, comments, tags } = body;
    const post = await Post.create({
      user: userId,
      content,
      likes,
      comments,
      tags,
    });
    res.status(201).json({
      message: "Post created",
      post,
    });
  }
);

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
export { createPost, getPostsByUserId };
