import express from "express";
import protect from "../middlewares/authMiddleware";
import {
  confirmRequest,
  deleteFriendRequest,
  getFriendReqestsByUserId,
  sendFriendRequest,
} from "../controllers/friendRequestController";

const friendRequestRouter = express.Router();

friendRequestRouter
  .route("/sendfriendrequest/:id")
  .post(protect, sendFriendRequest)
  .get(protect, getFriendReqestsByUserId)
  .patch(confirmRequest);

friendRequestRouter
  .route("/deletefriendrequest/:id")
  .delete(deleteFriendRequest);
export default friendRequestRouter;
