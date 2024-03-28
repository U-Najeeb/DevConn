import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController";
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").get(getUserById);

export default userRouter;
