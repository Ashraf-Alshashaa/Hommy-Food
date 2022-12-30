import React, { useContext } from "react";
import OrderToPrepareCard from "../../components/OrderToPrepareCard";
import { AuthContext } from "../../contexts/authentication";
import "./style.css";

const OrderToPrepare = () => {
  const statusArr = ["toPrepare", "ready", "complete"];
  const { user, setUser } = useContext(AuthContext);
  //console.log(user);
  return (
    <div className="order-to-prepare-page-container">
      <main className="order-to-prepare-main">
        <section className="order-to-prepare-section">
          <h2 className="order-to-prepare-title">to prepare</h2>
          <div className="order-to-prepare-container">
            {user?.orderToPrepare.map(
              (order) =>
                order.status === "toPrepare" && (
                  <OrderToPrepareCard
                    order={order}
                    key={order._id}
                    statusArr={statusArr}
                    setUser={setUser}
                  />
                )
            )}
          </div>
        </section>

        <section className="order-ready-section">
          <h2 className="order-to-prepare-title">ready</h2>

          <div className="order-ready-container">
            {user?.orderToPrepare.map(
              (order) =>
                order.status === "ready" && (
                  <OrderToPrepareCard
                    order={order}
                    key={order._id}
                    statusArr={statusArr}
                    setUser={setUser}
                  />
                )
            )}
          </div>
        </section>
      </main>
      <section className="order-complete-section">
        <h2 className="order-to-prepare-title">complete</h2>
        <div className="order-complete-container">
          {user?.orderToPrepare.map(
            (order) =>
              order.status === "complete" && (
                <OrderToPrepareCard
                  order={order}
                  key={order._id}
                  statusArr={statusArr}
                />
              )
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderToPrepare;
