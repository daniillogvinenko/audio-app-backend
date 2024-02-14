import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { songsInPlaylistController } from "./songsInPlaylistController.js";

const songsInPlaylistRouter = new Router();

songsInPlaylistRouter.get("/songsInPlaylist/:id", songsInPlaylistController.getOne); // authMiddleware

export default songsInPlaylistRouter;
