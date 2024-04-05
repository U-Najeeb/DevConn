import { JwtPayload } from "jsonwebtoken";
import FriendRequest from "../models/friendRequestModel";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: JwtPayload;
}
const sendFriendRequest = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    const userId = req.params.id;
    const friendRequest = await FriendRequest.create({
      sender: user?._id,
      receiver: userId,
    });

    res.status(200).json({
      message: "Friend Request Sent",
      friendRequest,
    });
  }
);

const getFriendReqestsByUserId = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const friendRequests = await FriendRequest.find({
      receiver: userId,
    }).populate("sender");

    res.status(200).json({
      message: "Friend Requests Found",
      count: friendRequests.length,
      friendRequests,
    });
  }
);

export { sendFriendRequest, getFriendReqestsByUserId };
