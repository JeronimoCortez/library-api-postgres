import express from "express";
import {
  deleteUser,
  updateUser,
  user,
  users,
} from "../controllers/userController";
import { authenticationToken } from "../services/user.service";

export const userRoutes = express.Router();

userRoutes.get("/", users);
userRoutes.get("/:id", user);
userRoutes.put("/:id", authenticationToken, updateUser);
userRoutes.delete("/:id", authenticationToken, deleteUser);
