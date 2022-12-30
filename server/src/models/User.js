import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  fullName: {
    first: String,
    last: String,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  isChef: { type: Boolean, required: true },
  photo: String,
  phone: Number,
  customerReviews: [
    {
      id: {
        type: mongoose.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      customerId: String,
      comment: String,
      likes: [String],
      dislikes: [String],
    },
  ],
  customerRates: [{ customerId: String, rate: Number }],
  orderToPrepare: [
    {
      customerId: String,
      deliveryAddress: String,
      createdAt: Date,
      deliveryType: String,
      totalPrice: Number,
      customerName: String,
      phone: Number,
      email: String,
      status: {
        type: String,
        enum: ["toPrepare", "ready", "completed"],
      },
      items: [
        {
          title: String,
          quantity: Number,
          customerName: String,
          image: String,
        },
      ],
    },
  ],
  orderHistory: [
    {
      chefId: mongoose.ObjectId,
      chefName: String,
      deliveryType: String,
      createdAt: Date,
      items: [
        {
          title: String,
          price: Number,
          quantity: Number,
          image: String,
        },
      ],
    },
  ],
  cart: [
    {
      mealId: {
        _id: mongoose.ObjectId,
        title: String,
        price: Number,
        quantity: Number,
        image: String,
        chefId: mongoose.ObjectId,
      },
      quantity: Number,
      chefName: String,
    },
  ],
  favoriteChefs: [String],
  deliveryType: {
    type: String,
    enum: ["pickup", "delivery"],
    default: "pickup",
  },
  videoUrl: String,
  aboutMe: String,
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "userName",
    "fullName",
    "password",
    "address",
    "isChef",
    "email",
    "photo",
    "phone",
    "customerReviews",
    "customerRates",
    "orderToPrepare",
    "orderHistory",
    "cart",
    "favoriteChefs",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.userName == null) {
    errorList.push("userName is a required field");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  if (userObject.password == null) {
    errorList.push("password is a required field");
  }
  if (userObject.isChef == null) {
    errorList.push("isChef is a required field");
  }

  return errorList;
};

export default User;
