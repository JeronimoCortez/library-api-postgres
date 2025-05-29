import jwt from "jsonwebtoken";
import { User } from "../models/User.interface";
import dotenv from "dotenv";
dotenv.config();

const claveSecreta = process.env.JWT_SECRET_KEY;

export const generatedToken = (user: User) => {
  if (!claveSecreta) {
    return;
  }
  return jwt.sign(user, claveSecreta, { expiresIn: "1h" });
};
