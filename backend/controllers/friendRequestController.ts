import { JwtPayload } from "jsonwebtoken";
import FriendRequest from "../models/friendRequestModel";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

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

const confirmRequest = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const requestId = req.params.id;
    const friendRequest = await FriendRequest.findOneAndUpdate(
      {
        _id: requestId,
      },
      { status: "Accepted" },
      {
        new: true,
        runValidators: true,
      }
    );

    await User.findByIdAndUpdate(
      { _id: friendRequest?.sender },
      { $push: { connections: friendRequest?.receiver } },
      { new: true, runValidators: true }
    );

    await User.findByIdAndUpdate(
      { _id: friendRequest?.receiver },
      { $push: { connections: friendRequest?.sender } },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "Friend Request Accepted",
      friendRequest,
    });
  }
);

const deleteFriendRequest = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const requestId = req.params.id;
    await FriendRequest.findByIdAndDelete({ _id: requestId });

    res.status(200).json({
      message: "Friend Requests Deleted",
    });
  }
);
export {
  sendFriendRequest,
  getFriendReqestsByUserId,
  confirmRequest,
  deleteFriendRequest,
};
