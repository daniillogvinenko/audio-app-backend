import { Router } from "express";
import { authController } from "./authController.js";

const authRouter = new Router();

authRouter.post("/login", authController.login);
authRouter.post("/registration", authController.registration);

export default authRouter;
