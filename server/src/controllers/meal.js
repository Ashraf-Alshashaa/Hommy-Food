import Meal, { validateMeal } from "../models/Meal.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find()
      .populate({ path: "cuisine", select: "title" })
      .populate({ path: "category", select: "title" })
      .populate({ path: "chefId", select: "userName deliveryType photo" })
      .exec();
    res.status(200).json({ success: true, result: meals });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get meals, try again later" });
  }
};

export const createMeal = async (req, res) => {
  try {
    const meal = req.body;

    if (typeof meal !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'meal' object. Received: ${JSON.stringify(
          meal
        )}`,
      });

      return;
    }
    const errorList = validateMeal(meal);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newMeal = await Meal.create(meal);

      res.status(201).json({ success: true, meal: newMeal });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create meal, try again later" });
  }
};

export const getMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findById(id)
      .populate({ path: "cuisine", select: "title" })
      .populate({ path: "category", select: "title" })
      .populate({ path: "chefId", select: "userName deliveryType photo" })
      .exec();
    res.status(200).json({ success: true, result: meal });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get meal, try again later" });
  }
};

export const updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    await Meal.findByIdAndUpdate(id, req.body);
    const updatedMeal = await Meal.findById(id);
    res.status(200).json({ success: true, result: updatedMeal });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to update meal, try again later" });
  }
};
export const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    await Meal.findByIdAndDelete(id, req.body);
    res.status(200).json({
      success: true,
      msg: `Meal with id: ${id} deleted from database`,
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to delete meal, try again later" });
  }
};
export const searchMeals = async (req, res) => {
  try {
    const { query } = req.query;
    const meals = await Meal.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { ingredients: { $regex: query, $options: "i" } },
      ],
      isAvailable: true,
    })
      .populate({ path: "cuisine", select: "title" })
      .populate({ path: "category", select: "title" })
      .populate({ path: "chefId", select: "userName deliveryType photo" })
      .exec();
    res.status(200).json({ success: true, result: meals });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get meals, try again later" });
  }
};

export const filterMeals = async (req, res) => {
  try {
    const { category, cuisine } = req.query;

    if (category) {
      const meals = await Meal.find({
        category: category,
        isAvailable: true,
      })
        .populate({ path: "cuisine", select: "title" })
        .populate({ path: "category", select: "title" })
        .populate({ path: "chefId", select: "userName deliveryType photo" })
        .exec();
      res.status(200).json({ success: true, result: meals });
    }
    if (cuisine) {
      const meals = await Meal.find({
        cuisine: cuisine,
        isAvailable: true,
      })
        .populate({ path: "cuisine", select: "title" })
        .populate({ path: "category", select: "title" })
        .populate({ path: "chefId", select: "userName deliveryType photo" })
        .exec();
      res.status(200).json({ success: true, result: meals });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get meals, try again later" });
  }
};

export const getMealsByChefId = async (req, res) => {
  try {
    const { id } = req.params;
    const meals = await Meal.find({ chefId: id })
      .populate({ path: "cuisine", select: "title" })
      .populate({ path: "category", select: "title" })
      .populate({ path: "chefId", select: "userName deliveryType photo" })
      .exec();
    res.status(200).json({ success: true, result: meals });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get meals, try again later" });
  }
};
