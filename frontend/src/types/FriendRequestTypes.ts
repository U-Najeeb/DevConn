import { UserTypes } from "./User";

export type FriendRequestTypes = {
  _id: string;
  sender: string | UserTypes;
  reciever: string;
  status: "Accepted" | "Rejected" | "Pending";
  createdAt: string;
};
