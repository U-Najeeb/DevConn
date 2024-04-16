import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import Group from "../models/groupModel";
import { JwtPayload } from "jsonwebtoken";

interface GroupRequestBody {
  name: string;
  description: string;
  members: string[];
  posts: string[];
}

interface CustomRequest extends Request {
  user: JwtPayload;
}
const createGroup = catchAsync(
  async (req: CustomRequest, res: Response, _next: NextFunction) => {
    const { name, description, members }: GroupRequestBody = req.body.formData;
    console.log(req.body);

    const user = req.user;
    const group = await Group.create({
      name,
      description,
      members,
      createdBy: user._id,
    });

    res.status(201).json({ message: "Group created successfully", group });
  }
);

const getAllGroups = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const groups = await Group.find();
    res
      .status(200)
      .json({ message: "Groups Found", count: groups.length, groups });
  }
);

const getGroupById = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group Found", group });
  }
);

const updateGroupById = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const { name, description, members, posts }: GroupRequestBody = req.body;

    const group = await Group.findByIdAndUpdate(
      id,
      { name, description, members, posts },
      { new: true, runValidators: true }
    );

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group updated successfully", group });
  }
);

const deleteGroupById = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;

    const group = await Group.findByIdAndDelete(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully" });
  }
);

export {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
};
