import { UserTypes } from "./User";

export type GroupTypes = {
  name: string;
  description: string;
  members: UserTypes[];
};
