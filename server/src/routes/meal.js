import express from "express";
import {
  createMeal,
  getMeals,
  searchMeals,
  filterMeals,
  updateMeal,
  getMeal,
  deleteMeal,
  getMealsByChefId,
} from "../controllers/meal.js";

const mealRouter = express.Router();

mealRouter.get("/", getMeals);
mealRouter.post("/create", createMeal);
mealRouter.patch("/update/:id", updateMeal);
mealRouter.get("/meal_detail/:id", getMeal);
mealRouter.delete("/delete/:id", deleteMeal);
mealRouter.get("/search", searchMeals); // meals/search?query=beef
mealRouter.get("/filter", filterMeals); // meals/filter?cuisine=Turkish&category=Vegan
mealRouter.get("/my_meals/:id", getMealsByChefId);
export default mealRouter;
