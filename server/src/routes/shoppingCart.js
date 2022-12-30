import express from "express";
import { authenticateToken } from "../controllers/user.js";
import {
  addToShoppingCart,
  increaseQuantityOfItem,
  decreaseQuantityOfItem,
  deleteItemFromShoppingCart,
  deleteShoppingCart,
} from "../controllers/shoppingCart.js";

const shoppingCardRouter = express.Router();

shoppingCardRouter.patch(
  "/add-to-cart/:mealId",
  authenticateToken,
  addToShoppingCart
);
shoppingCardRouter.patch(
  "/increase-quantity/:mealId",
  authenticateToken,
  increaseQuantityOfItem
);
shoppingCardRouter.patch(
  "/decrease-quantity/:mealId",
  authenticateToken,
  decreaseQuantityOfItem
);
shoppingCardRouter.delete(
  "/delete/item/:mealId",
  authenticateToken,
  deleteItemFromShoppingCart
);

shoppingCardRouter.delete("/delete", authenticateToken, deleteShoppingCart);

export default shoppingCardRouter;
