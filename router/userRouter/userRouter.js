import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { userController } from "./userController.js";

const userRouter = new Router();

userRouter.get("/users", userController.getAll); // authMiddleware
userRouter.get("/users/:id", userController.getOne); // authMiddleware
userRouter.get("/user-by-token", userController.getOneByToken); // authMiddleware

export default userRouter;
