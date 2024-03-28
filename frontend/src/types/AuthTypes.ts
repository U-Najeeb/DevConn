export type SignUpTypes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  bio?: string;
  dob?: string;
  profilePicture?: string | ArrayBuffer | null;
  skills?: string[];
  username: string;
};

export type LoginTypes = {
  email: string;
  password: string;
};
