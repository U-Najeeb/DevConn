import express from "express";
import {
  createPost,
  deletePostById,
  getPostsByUserId,
} from "../controllers/postsController";
import protect from "../middlewares/authMiddleware";
const postRouter = express.Router();

postRouter.route("/").get().post(protect, createPost);
postRouter
  .route("/:id")
  .get(protect, getPostsByUserId)
  .delete(protect, deletePostById);

export default postRouter;
