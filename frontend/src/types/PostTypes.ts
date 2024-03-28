import { UserTypes } from "./User";

export type PostType = {
  _id?: string;
  user?: UserTypes;
  content: string;
  likes?: string[];
  comment?: string[];
  tags?: string;
};
