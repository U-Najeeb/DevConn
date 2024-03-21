import User from "../models/userModel";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    res.status(200).json({
      message: "Users Found",
      count: users.length,
      users,
    });
  }
);
