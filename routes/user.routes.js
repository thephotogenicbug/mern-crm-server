import express from "express";
import { loginAgent, registerAgent } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register-agent", registerAgent);
userRouter.post("/login-agent", loginAgent);

export default userRouter;
