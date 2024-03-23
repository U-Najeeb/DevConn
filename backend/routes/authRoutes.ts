import { Router } from "express";
import {
  login,
  logout,
  signUp,
  validateToken,
} from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/signup", signUp);

authRouter.post("/logout", logout);

authRouter.post("/validate-token", validateToken);

export default authRouter;
