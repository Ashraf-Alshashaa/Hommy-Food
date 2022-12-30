import express from "express";
import { createCuisine, getCuisines } from "../controllers/cuisine.js";

const cuisineRouter = express.Router();

cuisineRouter.get("/", getCuisines);
cuisineRouter.post("/create", createCuisine);

export default cuisineRouter;
