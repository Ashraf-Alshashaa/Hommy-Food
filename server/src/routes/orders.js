import express from "express";
import { editStatus } from "../controllers/orders.js";
import { authenticateToken } from "../controllers/user.js";

const ordersRouter = express.Router();

ordersRouter.patch("/edit-status", authenticateToken, editStatus);

export default ordersRouter;
