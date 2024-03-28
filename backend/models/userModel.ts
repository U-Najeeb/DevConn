import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio?: string;
  gender: string;
  dob: string;
  profilePicture?: string;
  skills?: string[];
  connections?: mongoose.Types.ObjectId[];
  posts?: mongoose.Types.ObjectId[];
  groups?: mongoose.Types.ObjectId[];
  events?: mongoose.Types.ObjectId[];
  isAdmin: boolean;
  isActive: boolean;
  checkPassword(
    passwordFromBody: string,
    passwordInDb: string
  ): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    gender: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    skills: [
      {
        name: { type: String, required: true },
        level: { type: Number, default: 0 },
      },
    ],
    dob: { type: String, default: "" },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  passwordFromBody: string,
  passwordInDb: string
) {
  return await bcrypt.compare(passwordFromBody, passwordInDb);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
