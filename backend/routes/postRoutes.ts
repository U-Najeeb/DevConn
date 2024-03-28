import express from "express";
import { createPost, getPostsByUserId } from "../controllers/postsController";
import protect from "../middlewares/authMiddleware";
const postRouter = express.Router();

postRouter.route("/").get().post(protect, createPost);
postRouter.route("/:id").get(getPostsByUserId);

export default postRouter;
