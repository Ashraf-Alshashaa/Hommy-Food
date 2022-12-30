import express from "express";
import {
  getRate,
  postRate,
  getHighRatedTenChefs,
} from "../controllers/rate.js";
import { authenticateToken } from "../controllers/user.js";

const rateRouter = express.Router();

rateRouter.get("/:id", getRate);
rateRouter.post("/", authenticateToken, postRate);
rateRouter.get("/chefs/high-rated", getHighRatedTenChefs);

export default rateRouter;
