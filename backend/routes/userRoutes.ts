import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController";
import protect from "../middlewares/authMiddleware";
const userRouter = express.Router();

userRouter.route("/").get(protect, getAllUsers);
userRouter.route("/:id").get(protect,getUserById);

export default userRouter;
