import Stripe from "stripe";
import User from "../models/User.js";
import Meal from "../models/Meal.js";
import { logError } from "../util/logging.js";

export const createPayment = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { token, newAddress, deliveryType } = req.body;
  const email = req.user;

  try {
    const user = await User.findOne({
      email: email,
    });
    const chefId = user.cart[0].mealId.chefId;
    const isAvailable = await checkAvailableQuantity(user.cart);

    if (isAvailable) {
      if (token) {
        const customer = await stripe.customers.create({
          email: token.email,
          source: token.id,
        });

        await stripe.charges.create({
          amount: totalPrice(user.cart) * 100,
          customer: customer.id,
          currency: "EUR",
          description: user.userName,
        });

        await completeOrder(user, newAddress, deliveryType, chefId);
        const updatedUser = await User.findById(user._id);
        res.status(200).json({ success: true, result: updatedUser });
      } else {
        await completeOrder(user, newAddress, deliveryType, chefId);
        const updatedUser = await User.findById(user._id);
        res.status(200).json({ success: true, result: updatedUser });
      }
      return;
    }
    res.status(400).json({
      success: false,
      msg: "There is not enough quantity to complete your order",
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to pay now, try again later" });
  }
};

const getDate = () => {
  const date = Date.now();
  const dateForm = new Date(date);
  return dateForm;
};

const totalPrice = (cart) => {
  const getSum = (total, num) => total + num;
  const priceOfMeals = cart.map((item) => item.quantity * item.mealId.price);
  const totalPrice = priceOfMeals.reduce(getSum, 0);
  return totalPrice;
};

const setOrderToPrepare = async (
  newAddress,
  address,
  deliveryType,
  cart,
  userName,
  phone,
  email,
  chefId
) => {
  const order = {
    deliveryAddress: newAddress || address,
    createdAt: getDate(),
    deliveryType: deliveryType,
    totalPrice: totalPrice(cart),
    status: "toPrepare",
    customerName: userName,
    phone: phone,
    email: email,
    items: cart.map(({ mealId, quantity }) => {
      return {
        title: mealId.title,
        quantity: quantity,
        price: mealId.price,
        image: mealId.image,
      };
    }),
  };
  await User.findByIdAndUpdate(chefId, {
    $push: {
      orderToPrepare: order,
    },
  });
};

const setOrderHistory = async (cart, deliveryType, email) => {
  const order = {
    chefName: cart[0].chefName,
    createdAt: getDate(),
    deliveryType: deliveryType,
    items: cart.map(({ mealId, quantity }) => {
      return {
        title: mealId.title,
        quantity: quantity,
        price: mealId.price,
        image: mealId.image,
      };
    }),
  };

  await User.findOneAndUpdate(
    { email: email },
    {
      $push: {
        orderHistory: order,
      },
    }
  );
};

const updateQuantity = async (cart) => {
  cart.forEach(async (item) => {
    const mealQuantity = await Meal.findById(item.mealId._id);
    const quantity = mealQuantity.quantity - item.quantity;
    await Meal.findByIdAndUpdate(item.mealId._id, { quantity: quantity });
  });
};

const completeOrder = async (user, newAddress, deliveryType, chefId) => {
  const { _id, userName, email, cart, address, phone } = user;
  await setOrderToPrepare(
    newAddress,
    address,
    deliveryType,
    cart,
    userName,
    phone,
    email,
    chefId
  );
  await setOrderHistory(cart, deliveryType, email);
  await updateQuantity(cart);
  await User.findByIdAndUpdate(_id, { cart: [] });
};

const checkAvailableQuantity = async (cart) => {
  const isMealsAvailableArr = await cart.map(async (item) => {
    const meal = await Meal.findById(item.mealId._id);
    return meal.quantity >= item.quantity;
  });
  return Promise.all(isMealsAvailableArr).then((arr) =>
    arr.every((val) => val === true)
  );
};
