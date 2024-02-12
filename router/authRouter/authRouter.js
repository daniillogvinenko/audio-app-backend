import { Router } from "express";
import { authController } from "./authController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const authRouter = new Router();

authRouter.get("/users", authMiddleware, authController.getAll);
authRouter.get("/users/:id", authMiddleware, authController.getOne);
authRouter.post("/login", authController.login);
authRouter.post("/registration", authController.registration);

export default authRouter;
