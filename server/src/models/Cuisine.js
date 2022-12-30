import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";
const cuisineSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Cuisine = new mongoose.model("Cuisine", cuisineSchema);

export const validateCuisine = (cuisineObject) => {
  const errorList = [];
  const allowedKeys = ["title"];

  const validatedKeysMessage = validateAllowedFields(
    cuisineObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (cuisineObject.title == null) {
    errorList.push("title is a required field");
  }

  return errorList;
};

export default Cuisine;
