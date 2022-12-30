import express from "express";
import { createPayment } from "../controllers/payment.js";
import { authenticateToken } from "../controllers/user.js";

const paymentRouter = express.Router();

paymentRouter.post("/", authenticateToken, createPayment);

export default paymentRouter;
