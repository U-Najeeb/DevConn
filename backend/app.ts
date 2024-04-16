import express, { Request, Response, NextFunction } from "express";
import globalErrorController from "./controllers/errorController";
import AppError from "./utils/AppError";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes";
import path from "path";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import friendRequestRouter from "./routes/friendRequestRoutes";
import groupRouter from "./routes/GroupRoutes";

const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(express.static(path.resolve(__dirname, "static/profilePictures")));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/friendrequest", friendRequestRouter);
app.use("/api/v1/groups", groupRouter);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorController);
export default app;
