import User from "../models/User.js";
import { logError } from "../util/logging.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const getRate = async (req, res) => {
  const { id } = req.params;
  try {
    const rate = await User.aggregate([
      {
        $match: {
          _id: ObjectId(`${id}`),
        },
      },
      {
        $project: {
          rate: {
            $avg: "$customerRates.rate",
          },
          _id: 0,
        },
      },
    ]);
    res.status(200).json({ success: true, result: rate[0].rate.toFixed() });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get chef rate, try again later",
    });
  }
};

export const postRate = async (req, res) => {
  const email = req.user;
  const { rate, chefId } = req.body;
  try {
    const userData = await User.findOne({ email: email });
    const userId = userData._id.toString();
    const chefData = await User.findById(chefId);
    const newRate = {
      customerId: userData._id,
      rate: rate,
    };

    const isRated = chefData.customerRates.some(
      ({ customerId }) => customerId === userId
    );

    if (!isRated) {
      await User.findByIdAndUpdate(chefId, {
        $push: {
          customerRates: newRate,
        },
      });
    } else {
      await User.updateOne(
        { _id: chefId, "customerRates.customerId": `${Object(userId)}` },
        {
          $set: {
            "customerRates.$.rate": `${rate}`,
          },
        }
      );
    }
    const updatedChef = await User.aggregate([
      {
        $match: {
          _id: new ObjectId(`${chefId}`),
        },
      },
      {
        $project: {
          password: 0,
          orderToPrepare: 0,
          orderHistory: 0,
          cart: 0,
          favoriteChefs: 0,
        },
      },
      {
        $addFields: {
          AvgCustomerRates: {
            $avg: "$customerRates.rate",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      result: updatedChef[0],
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to rate chef, try again later" });
  }
};

export const getHighRatedTenChefs = async (req, res) => {
  try {
    const highRatedTenChefs = await User.aggregate([
      {
        $match: {
          isChef: true,
        },
      },
      {
        $project: {
          _id: 1,
          AvgCustomerRates: {
            $avg: "$customerRates.rate",
          },
          photo: 1,
          userName: 1,
        },
      },
      {
        $sort: {
          AvgCustomerRates: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    res.status(200).json({ success: true, result: highRatedTenChefs });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get hi chef rate, try again later",
    });
  }
};
