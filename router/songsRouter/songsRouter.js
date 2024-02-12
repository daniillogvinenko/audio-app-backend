import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { songsController } from "./songsController.js";

const songsRouter = new Router();

songsRouter.get("/songs", authMiddleware, songsController.getAll);
songsRouter.get("/songs/:id", authMiddleware, songsController.getOne);

export default songsRouter;
