import { UserTypes } from "./User";

export type PostType = {
  _id?: string;
  user?: string | UserTypes;
  content: string;
  images: string[];
  likes?: string[];
  comment?: string[];
  tags?: string;
  type?: "code" | "text" | "event";
  createdAt?: string;
};
