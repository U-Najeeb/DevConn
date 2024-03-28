import User from "../models/userModel";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";

const getAllUsers = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const users = await User.find();
    res.status(200).json({
      message: "Users Found",
      count: users.length,
      users,
    });
  }
);

const getUserById = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    res.status(200).json({
      message: "User Found",
      user,
    });
  }
);

export { getAllUsers, getUserById };
