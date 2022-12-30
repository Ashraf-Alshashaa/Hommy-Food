import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const updateUserFavorites = async (req, res) => {
  try {
    const { chefId } = req.body;
    const userData = await User.findOne({ email: req.user });
    const isAdded = userData.favoriteChefs.some((id) => id == chefId);
    if (!isAdded) {
      await User.findOneAndUpdate(
        { email: req.user },
        { $push: { favoriteChefs: chefId } }
      );
    } else {
      await User.findOneAndUpdate(
        { email: req.user },
        { $pull: { favoriteChefs: chefId } }
      );
    }
    const updatedUser = await User.findOne({ email: req.user });
    res.status(200).json({ success: true, result: updatedUser });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to add chef to favorites, try again later",
    });
  }
};
