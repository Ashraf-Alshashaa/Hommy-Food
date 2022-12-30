import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authentication";
import OrdersHistoryCard from "../OrderHistoryCard";
import "./style.css";

const OrdersHistory = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user?.orderHistory.length !== 0 ? (
        <div className="customer-personal-info-container">
          <div className="customer-order-history-container">
            <div className="profile-last-orders-title">
              <h2>My orders</h2>
            </div>
            <div className="customer-orders-history">
              {user?.orderHistory.reverse().map((order, index) => {
                return (
                  <div key={index}>
                    <OrdersHistoryCard order={order} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-orders-title-container">
          <h2 className="no-orders-title">No recent orders yet</h2>
        </div>
      )}
    </div>
  );
};

OrdersHistory.propTypes = {};

export default OrdersHistory;
