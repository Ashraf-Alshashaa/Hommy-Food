import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import OrderToPreparePopup from "../OrderToPreparePopup";
import useFetch from "../../hooks/useFetch";
import { postOnAuthEndpoint } from "../../hooks/fetchOptions.js";

const OrderToPrepareCard = ({ order, setUser }) => {
  const [openModal, setOpenModal] = useState(false);
  const { createdAt, deliveryType, totalPrice, items } = order;
  const { performFetch } = useFetch("/orders/edit-status", (data) =>
    setUser(data?.result)
  );
  return (
    <article className="order-to-prepare-card-container">
      <section className="order-to-prepare-info-container">
        <div className="order-to-prepare-info-header">
          <p>{deliveryType}</p>
          <p>{new Date(createdAt).toString().slice(0, 21)}</p>
        </div>
        <div className="order-to-prepare-meals-titles">
          <h6>
            {items.map(
              ({ title }, idx, arr) =>
                `${title}${arr.length - 1 > idx ? "," : "."} `
            )}
          </h6>
          <p
            className="order-to-prepare-more-details center-children"
            onClick={() => setOpenModal(!openModal)}
          >
            {" "}
            details
          </p>
        </div>
      </section>
      <div className="order-to-prepare-price-status-container">
        {order.status === "toPrepare" && (
          <button
            className="order-to-prepare-status-btn"
            onClick={() =>
              performFetch(
                postOnAuthEndpoint(
                  { orderId: order._id, status: "ready" },
                  "PATCH"
                )
              )
            }
          >
            ready
          </button>
        )}
        {order.status === "ready" && (
          <button
            className="order-to-prepare-status-btn"
            onClick={() =>
              performFetch(
                postOnAuthEndpoint(
                  { orderId: order._id, status: "complete" },
                  "PATCH"
                )
              )
            }
          >
            complete
          </button>
        )}
        {order.status === "complete" && <p>complete</p>}

        <h6>price: {totalPrice} €</h6>
      </div>
      {openModal && (
        <div className="update-profile-popup-container">
          <OrderToPreparePopup setOpenModal={setOpenModal} order={order} />
        </div>
      )}
    </article>
  );
};

export default OrderToPrepareCard;

OrderToPrepareCard.propTypes = {
  order: PropTypes.object,
  setUser: PropTypes.func,
};
