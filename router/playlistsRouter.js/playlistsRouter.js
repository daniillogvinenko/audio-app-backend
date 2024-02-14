import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { playlistsController } from "./playlistsController.js";

const playlistsRouter = new Router();

playlistsRouter.get("/playlists", authMiddleware, playlistsController.getAll);
playlistsRouter.get("/playlists/:id", authMiddleware, playlistsController.getOne);

export default playlistsRouter;
