export type SignUpTypes = {
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
};

export type LoginTypes = {
  email: string;
  password: string;
};
