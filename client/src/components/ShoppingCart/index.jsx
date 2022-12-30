import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/authentication";
import "./style.css";
import { MsgPopupContext } from "../../contexts/msgPopup";
import useFetch from "../../hooks/useFetch";

const ShoppingCart = ({ id, chefId, quantityLeft }) => {
  const { user, setUser } = useContext(AuthContext);
  const { setPopup } = useContext(MsgPopupContext);
  const { performFetch, isLoading, error } = useFetch(
    `/customer/shopping-cart/add-to-cart/${id}`,
    (data) => setUser(data?.result)
  );
  const navigate = useNavigate();

  const handleCartClick = () => {
    const chefIdInCart = user?.cart[0]?.mealId?.chefId;
    const findMeal = user?.cart?.filter((meal) => meal.mealId._id === id);
    const totalQuantity = quantityLeft;
    const orderedQuantity = findMeal[0]?.quantity || 0;
    if (!chefIdInCart || chefId === chefIdInCart) {
      if (totalQuantity > orderedQuantity) {
        const token = localStorage.getItem("accessToken");
        performFetch({
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!error && !isLoading) {
          setPopup({
            type: "success",
            text: "The meal added to cart",
            open: true,
          });
        }
      } else {
        setPopup({
          type: "error",
          text: "No more available quantity",
          open: true,
        });
      }
    } else {
      setPopup({
        type: "error",
        text: "Sorry! you can't order from a different chef",
        open: true,
      });
    }
  };

  const handleRedirect = () => {
    setTimeout(() => {
      navigate("/login");
    }, "3000");
    setPopup({
      type: "error",
      text: "Sorry! you need to login",
      open: true,
    });
  };

  return (
    <div className="shopping-cart-container">
      {user ? (
        <>
          {chefId === user?._id ? (
            <>
              <Link to={`/edit-meal/${id}`}>
                <i className="fa-solid fa-pen">
                  <p>Edit</p>
                </i>
              </Link>
            </>
          ) : (
            <button
              className={
                isLoading
                  ? "shopping-cart-btn-disable"
                  : "shopping-cart-btn-enable"
              }
              onClick={handleCartClick}
              disabled={isLoading}
            >
              <i className="fa-solid fa-cart-shopping faa-xl"></i>
            </button>
          )}
        </>
      ) : (
        <>
          <button
            className="shopping-cart-btn-disable"
            onClick={handleRedirect}
          >
            <i className="fa-solid fa-cart-shopping faa-xl"></i>
          </button>
        </>
      )}
    </div>
  );
};

ShoppingCart.propTypes = {
  id: PropTypes.string.isRequired,
  chefId: PropTypes.string,
  quantityLeft: PropTypes.number,
};

export default ShoppingCart;
