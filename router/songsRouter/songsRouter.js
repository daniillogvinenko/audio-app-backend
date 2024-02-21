import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { songsController } from "./songsController.js";

const songsRouter = new Router();

songsRouter.get("/songs", songsController.getAll); // authMiddleware
songsRouter.get("/songs/:id", songsController.getOne); // authMiddleware

export default songsRouter;
