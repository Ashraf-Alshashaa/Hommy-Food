import express from "express";
import { updateUserFavorites } from "../controllers/favorites.js";
import { authenticateToken } from "../controllers/user.js";

const favoritesRouter = express.Router();

favoritesRouter.patch("/", authenticateToken, updateUserFavorites);

export default favoritesRouter;
