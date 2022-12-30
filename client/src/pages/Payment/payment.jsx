import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/authentication.js";
import { MsgPopupContext } from "../../contexts/msgPopup.js";
import { useLocation, useNavigate } from "react-router-dom";
import mastercard from "../../../public/images/mastercard_icon.png";
import ideal from "../../../public/images/ideal_icon.png";
import visa from "../../../public/images/visa_icon.png";
import cash from "../../../public/images/cash_money_icon.png";
import paymentCard from "../../../public/images/payment_card_icon.png";
import euro from "../../../public/images/euro_icon.png";
import StripeCheckout from "react-stripe-checkout";
import { postOnAuthEndpoint } from "../../hooks/fetchOptions.js";

import "./style.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state?.isCheckout) navigate("/", { replace: true });
  const [typeOfPayment, setTypeOfPayment] = useState("cash");
  const [radioChecked, setRadioChecked] = useState(true);

  const { setPopup } = useContext(MsgPopupContext);
  const { user, setUser } = useContext(AuthContext);

  const totalPricesOfMeals = user?.cart?.map(
    (item) => item.quantity * item.mealId.price
  );

  const getSum = (total, num) => total + num;

  const totalPrice = totalPricesOfMeals?.reduce(getSum, 0);

  useEffect(() => {
    setRadioChecked(!radioChecked);
  }, [typeOfPayment]);

  const handelOnChange = (e) => {
    setTypeOfPayment(e.target.value);
  };

  const url = `${process.env.BASE_SERVER_URL}/api/payment`;

  const makePayment = (token) => {
    setPopup({
      type: "success",
      text: "please wait",
      open: true,
    });
    (async () => {
      try {
        const response = await fetch(
          url,
          postOnAuthEndpoint(
            {
              token: token ? token : null,
              deliveryAddress: state.newAddress,
              deliveryType: state.deliveryType,
            },
            "POST"
          )
        );

        if (response.status === 200) {
          const data = await response.json();
          setUser(data.result);
          setPopup({
            type: "success",
            text: "order is completed",
            open: true,
          });
          navigate("/my-orders", { replace: true });
        } else {
          const err = await response.json();
          setPopup({
            type: "error",
            text: err.msg,
            open: true,
          });
        }
      } catch (error) {
        setPopup({ type: "error", text: error.message, open: true });
      }
    })();
  };

  return (
    <main className="payment-page center-children">
      <div className="complete-payment-container">
        <h4>payment</h4>
        <h5>choose your payment method</h5>
        <h6>total price € {totalPrice}</h6>
        <div className="payment-type-container">
          <label className={!radioChecked ? "focus" : "notFocus"}>
            <input
              type="radio"
              name="cash-payment"
              value="cash"
              onChange={(e) => handelOnChange(e)}
              checked={!radioChecked}
            />
            Cash
            <img src={euro} alt="euro" className="euro" />
          </label>
          <label className={radioChecked ? "focus" : "notFocus"}>
            <input
              type="radio"
              name="online-payment"
              value="online"
              onChange={(e) => handelOnChange(e)}
              checked={radioChecked}
            />
            Online
            <img
              src={paymentCard}
              alt="paymentCard"
              className="payment-card-online"
            />
          </label>
        </div>
        {typeOfPayment === "cash" ? (
          <button
            className="link-my-orders-payment-page"
            onClick={() => makePayment()}
          >
            complete order
          </button>
        ) : (
          <StripeCheckout
            stripeKey={process.env.STRIPE_PUBLIC_KEY}
            token={(token) => makePayment(token)}
            name={`The total amount ${totalPrice} Є`}
            price={totalPrice}
            className="stripe-checkout-btn"
          >
            <button className="link-my-orders-payment-page">
              complete order
            </button>
          </StripeCheckout>
        )}
        <div className="payment-methods-icons-container">
          <img
            src={mastercard}
            alt="mastercard"
            className="payment-methods-icons"
          />

          <img src={visa} alt="visa" className="payment-methods-icons" />
          <img
            src={ideal}
            alt="ideal"
            className="payment-methods-icons ideal-icons"
          />
          <img
            src={cash}
            alt="cash"
            className="payment-methods-icons cash-icon"
          />
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;
