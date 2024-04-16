import express from "express";
import protect from "../middlewares/authMiddleware";
import {
  createGroup,
  deleteGroupById,
  getAllGroups,
  getGroupById,
  updateGroupById,
} from "../controllers/groupController";
const groupRouter = express.Router();
groupRouter.route("/create-group").post(protect, createGroup);
groupRouter.route("/").get(protect, getAllGroups);
groupRouter
  .route("/:id")
  .get(protect, getGroupById)
  .patch(protect, updateGroupById)
  .delete(protect, deleteGroupById);

export default groupRouter;
