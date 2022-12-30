import React from "react";
import PropTypes from "prop-types";
import OrdersDetailsCards from "../../components/OrderDetailsCards";
import "./style.css";

const OrdersHistoryCard = ({ order }) => {
  const { createdAt, deliveryType, chefName, items } = order;
  const totalPricesOfMeal = items?.map((item) => item.quantity * item.price);
  const getSum = (total, num) => total + num;
  const totalPriceOfOrder = totalPricesOfMeal?.reduce(getSum, 0);
  return (
    <div className="order-history-card-container">
      <h5 className="order-date">
        <span className="order-date-value">
          &nbsp;&nbsp;{new Date(createdAt).toString().slice(0, 21)}
        </span>
      </h5>
      {items?.map((item, index) => {
        return (
          <div key={index}>
            {
              <OrdersDetailsCards
                item={item}
                deliveryType={deliveryType}
                chefName={chefName}
              />
            }
          </div>
        );
      })}
      <h5 className="order-history-price">
        Total price:
        <span className="order-total-price-value">
          &nbsp;&nbsp; € {totalPriceOfOrder}
        </span>
      </h5>
    </div>
  );
};

OrdersHistoryCard.propTypes = {
  order: PropTypes.object,
};

export default OrdersHistoryCard;
