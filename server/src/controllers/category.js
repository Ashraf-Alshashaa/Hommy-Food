import Category, { validateCategory } from "../models/Category.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, result: categories });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get categories, try again later",
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = req.body;

    if (typeof category !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'category' object. Received: ${JSON.stringify(
          category
        )}`,
      });

      return;
    }
    const errorList = validateCategory(category);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newCategory = await Category.create(category);

      res.status(201).json({ success: true, category: newCategory });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create category, try again later",
    });
  }
};
