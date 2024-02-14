import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { playlistsController } from "./playlistsController.js";

const playlistsRouter = new Router();

playlistsRouter.get("/playlists", playlistsController.getAll); // authMiddleware
playlistsRouter.get("/playlists/:id", playlistsController.getOne); // authMiddleware

export default playlistsRouter;
