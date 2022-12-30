import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authentication";
import "./style.css";
import deliveryImg from "../../../public/images/delivery.png";
import pickupImg from "../../../public/images/pickup.jpeg";
import InputForm from "../../components/InputForm";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const CheckoutPage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [newAddress, setNewAddress] = useState();
  const [sendNewAddress, setSendNewAddress] = useState(false);
  const [chef, setChef] = useState();
  const navigate = useNavigate();
  const chefId = user?.cart[0]?.mealId?.chefId;
  const { performFetch } = useFetch(`/user/chef/${chefId}`, (data) =>
    setChef(data?.result)
  );
  useEffect(() => {
    if (user) {
      performFetch();
    }
  }, [user]);

  const deliveryType = chef?.deliveryType;
  if (isLoading) {
    return (
      <div className="result-page-container">
        <div className="loading-gif">
          <PulseLoader
            color="#f9a01b"
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {deliveryType === "pickup" && (
        <div className="checkout-page">
          <h1>Checkout Step</h1>
          <div className="checkout-pickup-option">
            <h3>
              Chef is waiting for you. You can pick your order from the address
              below.
            </h3>
            <div className="customer-info-card">
              <div className="delivery-img">
                <div className="img-inner">
                  <div className="inner-skew">
                    <img src={chef?.photo || pickupImg} alt="pickup" />
                  </div>
                </div>
              </div>
              <div className="customer-existing-info-container">
                <div className="contact-info-container">
                  <h3>Chef Contact</h3>
                  <p>
                    <label>Name:</label>
                    {`${chef?.fullName?.first} ${chef?.fullName?.last}`}
                  </p>
                  <p>
                    <label>Phone Number:</label> {`${chef?.phone}`}
                  </p>
                  <p>
                    <label>Email:</label> {`${chef?.email}`}
                  </p>
                </div>
                <div className="address-container">
                  <h3>Pickup Address</h3>
                  {chef?.address}
                </div>
              </div>
            </div>
          </div>
          <button
            className="continue-btn"
            onClick={() =>
              navigate("/checkout/payment", {
                state: {
                  newAddress,
                  isCheckout: true,
                  deliveryType: deliveryType,
                },
                replace: true,
              })
            }
          >
            To Payment
            <i className="fa-solid fa-arrow-right payment-arrow-icon"></i>
          </button>
        </div>
      )}

      {deliveryType === "delivery" && (
        <div className="checkout-page">
          <h1>Checkout Step</h1>
          <div className="checkout-delivery-option ">
            <div className="customer-info-card">
              <div className="delivery-img">
                <div className="img-inner">
                  <div className="inner-skew">
                    <img src={deliveryImg} alt="delivery" />
                  </div>
                </div>
              </div>
              <div className="customer-existing-info-container">
                <div className="contact-info-container">
                  <h3>Contact</h3>
                  <p>
                    <label>Name:</label>{" "}
                    {`${user?.fullName?.first} ${user?.fullName?.last}`}
                  </p>
                  <p>
                    <label>Phone Number:</label> {`${user?.phone}`}
                  </p>
                  <p>
                    <label>Email:</label> {`${user?.email}`}
                  </p>
                </div>
                <div className="address-container">
                  <h3>Address</h3>
                  {user?.address ? (
                    <p>{`${user?.address}`}</p>
                  ) : (
                    <p>
                      Your address is still missing in your profile. Please fill
                      the address form.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="new-address-form">
              <h4>
                {user?.address ? (
                  <div className="new-address-check-box-container">
                    <>
                      <input
                        className="toggle"
                        type="checkbox"
                        id="sendNewAddress"
                        name="sendNewAddress"
                        value={sendNewAddress}
                        onChange={() => setSendNewAddress(!sendNewAddress)}
                      />
                      <label
                        className="toggle-label"
                        htmlFor="sendNewAddress"
                      ></label>
                    </>
                    <p>I want my order to this address.</p>
                  </div>
                ) : (
                  "You need to fill delivery address"
                )}
              </h4>
              <InputForm
                className="address-input"
                label="Address*"
                type="text"
                placeholder="Delivery Address"
                name="street"
                errorMessage="Address is required field!"
                value={newAddress || ""}
                onChange={(e) => setNewAddress(e.target.value)}
                required
                disabled={!sendNewAddress}
              />
            </div>
          </div>
          <button
            className="continue-btn"
            onClick={() =>
              navigate("/checkout/payment", {
                state: {
                  newAddress,
                  isCheckout: true,
                  deliveryType: deliveryType,
                },
                replace: true,
              })
            }
          >
            To Payment
            <i className="fa-solid fa-arrow-right payment-arrow-icon"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
