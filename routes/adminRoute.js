import express from "express";
import loginController from "../controllers/adminController.js";

const userRouter = express.Router();

userRouter.post("/admin-panel/login", loginController)

export default userRouter;