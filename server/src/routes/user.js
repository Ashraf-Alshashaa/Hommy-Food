import express from "express";
import {
  createUser,
  getProfile,
  login,
  authenticateToken,
  updateUser,
  getChef,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", authenticateToken, getProfile);
userRouter.get("/chef/:id", getChef);
userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.patch("/", authenticateToken, updateUser);

export default userRouter;
