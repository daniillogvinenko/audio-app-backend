import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { songsController } from "./songsController.js";

const songsRouter = new Router();

songsRouter.get("/songs", authMiddleware, songsController.getAll); // authMiddleware
songsRouter.get("/songs/:id", authMiddleware, songsController.getOne); // authMiddleware

export default songsRouter;
