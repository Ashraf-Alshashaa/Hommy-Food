import React from "react";
import PropTypes from "prop-types";
import OrderToPrepareItem from "../OrderToPrepareItem";
import "./style.css";

const OrderToPreparePopup = ({ setOpenModal, order }) => {
  const {
    items,
    customerName,
    deliveryAddress,
    deliveryType,
    totalPrice,
    phone,
    email,
  } = order;
  return (
    <div className="order-popup-container">
      <div className="order-popup-header">
        <p className="popup-desc">Order information</p>
        <button
          className="order-popup-close-btn center-children"
          onClick={() => setOpenModal(false)}
        >
          <i className="fa-solid fa-x order-popup-close-x"></i>
        </button>
      </div>
      <div className="order-to-prepare-field">
        <article className="order-to-prepare-customer-info">
          <h4>name: {customerName}</h4>
          {deliveryType === "delivery" && (
            <p>delivery address: {deliveryAddress}</p>
          )}
          <p>totalPrice: {totalPrice} €</p>
          {phone && <p>phone: {phone}</p>}
          <p>email: {email}</p>
        </article>
        <OrderToPrepareItem items={items} />
      </div>
    </div>
  );
};

OrderToPreparePopup.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  order: PropTypes.object,
};

export default OrderToPreparePopup;
