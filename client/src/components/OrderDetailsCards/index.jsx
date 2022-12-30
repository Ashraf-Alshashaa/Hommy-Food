import React from "react";
import PropTypes from "prop-types";
import defaultImage from "../../../public/images/food.jpg";
import "./style.css";

const OrderDetailsCards = ({ item, deliveryType, chefName }) => {
  const { title, price, quantity, image } = item;
  return (
    <div className="order-details-card-container">
      <div className="order-details-img-container center-children">
        <img
          className="order-details-img"
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = { defaultImage };
          }}
        />
      </div>
      <div className="order-details-info">
        <div className="order-details-basic-info">
          <p>
            <span className="meal-info-titles">Meal name: </span>
            &nbsp;&nbsp;
            {title}
          </p>
          <p>
            <span className="meal-info-titles">Chef name: </span>&nbsp;&nbsp;{" "}
            {chefName}
          </p>
          <p>
            <span className="meal-info-titles">Delivery type: </span>
            &nbsp;&nbsp;
            {deliveryType}
          </p>
        </div>
        <div className="order-details-price-info">
          <p>
            <span className="meal-info-titles">Quantity: </span> &nbsp;&nbsp;
            {quantity}
          </p>
          <p>
            <span className="meal-info-titles">Price: </span>&nbsp;&nbsp;€&nbsp;
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};

OrderDetailsCards.propTypes = {
  item: PropTypes.object,
  deliveryType: PropTypes.string,
  chefName: PropTypes.string,
};
export default OrderDetailsCards;
