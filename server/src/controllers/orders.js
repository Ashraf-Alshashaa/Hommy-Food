import { logError } from "../util/logging.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const editStatus = async (req, res) => {
  const email = req.user;
  const { orderId, status } = req.body;

  try {
    await User.updateOne(
      { email: email, "orderToPrepare._id": `${ObjectId(orderId)}` },
      {
        $set: {
          "orderToPrepare.$.status": `${status}`,
        },
      }
    );

    const updatedUser = await User.findOne({ email: email });

    res.status(200).json({ success: true, result: updatedUser });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable change order status now, try again later",
    });
  }
};
