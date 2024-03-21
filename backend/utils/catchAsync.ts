import { NextFunction } from "express";

export const catchAsync = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error: Error) => next(error));
  };
};
