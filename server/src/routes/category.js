import express from "express";
import { createCategory, getCategories } from "../controllers/category.js";
const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/create", createCategory);

export default categoryRouter;
