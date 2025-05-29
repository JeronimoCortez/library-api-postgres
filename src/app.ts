import dotenv from "dotenv";
import express from "express";
import { userRoutes } from "./routes/user";
import { authRouter } from "./routes/auth";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRouter);

export default app;
