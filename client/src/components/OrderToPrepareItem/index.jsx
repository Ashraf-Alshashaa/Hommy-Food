import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const OrderToPrepareItem = ({ items }) => {
  const imgURL =
    "https://res.cloudinary.com/dmykyluyo/image/upload/v1668194264/meal_photos/nezxr8lcizgsnr48y5mi.png";
  return (
    <div className="order-items-container center-children">
      {items.map(({ title, quantity, image }, idx) => (
        <div className="order-item-container" key={title + idx}>
          <div className="order-item-img-container">
            <img
              className="order-item-img center-children"
              src={image || imgURL}
            />
          </div>
          <div className="order-item-info-container">
            <h6>{title}</h6>
            <p>quantity: {quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderToPrepareItem;

OrderToPrepareItem.propTypes = {
  items: PropTypes.array,
};
