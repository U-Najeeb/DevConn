import processImage from "../utils/imageProcessing";
import User from "../models/userModel";
import AppError from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const signingFunc = (payload: string | object): string | undefined => {
  if (!process.env.JWT_SECRET) {
    return undefined;
  }

  return jwt.sign({ payload }, process.env.JWT_SECRET);
};

const signUp = catchAsync(async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    profilePicture,
    skills,
    bio,
    dob,
    gender,
  } = req.body;

  const processedImage = await processImage(
    firstName,
    lastName,
    profilePicture?.split(",")[1]
  );
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    username,
    password,
    skills,
    gender,
    bio,
    dob,
    profilePicture: processedImage,
  });

  const token = signingFunc(newUser._id);

  res.cookie("jwt", token, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });

  res.status(201).json({
    message: "User Registered",
    newUser,
    token,
  });
});

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    const token = signingFunc(user._id);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  }
);

interface CustomRequest extends Request {
  user?: JwtPayload;
}

const validateToken = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
      return next(new AppError("Please login first", 400));
    }
    if (!process.env.JWT_SECRET) {
      return next(new AppError("JWT SECRET OR TOKEN NOT FOUND", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: (decoded as JwtPayload)?.payload,
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    req.user = decoded as JwtPayload;
    res.status(200).json({
      message: "User already logged in",
      user,
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).send("Logged Out");
    }
  }
);

export { signUp, login, validateToken, logout };
