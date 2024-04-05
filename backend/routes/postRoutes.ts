import express from "express";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostsByUserId,
  updatePostById,
} from "../controllers/postsController";
import protect from "../middlewares/authMiddleware";
const postRouter = express.Router();

postRouter.route("/").get(getAllPosts).post(protect, createPost);
postRouter
  .route("/:id")
  .get(protect, getPostsByUserId)
  .patch(protect, updatePostById)
  .delete(protect, deletePostById);

export default postRouter;
