import express from "express";
import protect from "../middlewares/authMiddleware";
import {
  getFriendReqestsByUserId,
  sendFriendRequest,
} from "../controllers/friendRequestController";

const friendRequestRouter = express.Router();

friendRequestRouter
  .route("/sendfriendrequest/:id")
  .post(protect, sendFriendRequest)
  .get(protect, getFriendReqestsByUserId);
export default friendRequestRouter;
