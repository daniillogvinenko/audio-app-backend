import { Router } from "express";
import { authController } from "./authController.js";

const authRouter = new Router();

authRouter.get("/users", authController.getAll); // authMiddleware
authRouter.get("/users/:id", authController.getOne); // authMiddleware
authRouter.post("/login", authController.login);
authRouter.post("/registration", authController.registration);

export default authRouter;
