import Cuisine, { validateCuisine } from "../models/Cuisine.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find();
    res.status(200).json({ success: true, result: cuisines });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get cuisines, try again later",
    });
  }
};

export const createCuisine = async (req, res) => {
  try {
    const cuisine = req.body;

    if (typeof cuisine !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'cuisine' object. Received: ${JSON.stringify(
          cuisine
        )}`,
      });

      return;
    }
    const errorList = validateCuisine(cuisine);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newCuisine = await Cuisine.create(cuisine);

      res.status(201).json({ success: true, cuisine: newCuisine });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create cuisine, try again later",
    });
  }
};
