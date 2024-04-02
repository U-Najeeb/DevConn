export type UserTypes = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  bio?: string;
  dob?: string;
  profilePicture?: string | ArrayBuffer | null;
  skills?: {
    name: string;
    level: number;
  }[];
  username: string;
  connections: [];
  posts: [];
  events: [];
  isAdmin: boolean;
  isActive: boolean;
};
