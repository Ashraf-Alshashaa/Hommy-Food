import React from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import "./style.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authentication";
import useFetch from "../../hooks/useFetch";
import { MsgPopupContext } from "../../contexts/msgPopup";
const ShoppingCartCard = ({
  image,
  title,
  price,
  quantity,
  mealId,
  availableQuantity,
}) => {
  const total = quantity * price;
  const { setUser } = useContext(AuthContext);
  const { popup, setPopup } = useContext(MsgPopupContext);
  const navigate = useNavigate();
  // ____________________DecreaseQuantity_________________________
  const { performFetch: performFetchDecreaseQuantity } = useFetch(
    `/customer/shopping-cart/decrease-quantity/${mealId}`,
    (data) => setUser(data?.result)
  );
  const handleDecreaseClick = () => {
    setPopup({ type: "", text: "", open: false });
    const token = localStorage.getItem("accessToken");
    performFetchDecreaseQuantity({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
  // ____________________IncreaseQuantity_________________________
  const { performFetch: performFetchIncreaseQuantity } = useFetch(
    `/customer/shopping-cart/increase-quantity/${mealId}`,
    (data) => setUser(data?.result)
  );
  const handleIncreaseClick = () => {
    if (quantity >= availableQuantity) {
      setPopup({ type: "error", text: "No more meals available", open: true });
      return;
    }
    const token = localStorage.getItem("accessToken");
    performFetchIncreaseQuantity({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
  // ____________________RemoveOneMeal_________________________
  const { performFetch: performFetchRemoveOne } = useFetch(
    `/customer/shopping-cart/delete/item/${mealId}`,
    (data) => setUser(data?.result)
  );
  const handleRemoveClick = () => {
    const token = localStorage.getItem("accessToken");
    performFetchRemoveOne({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <tbody>
      <tr>
        <td>
          <img
            src={image}
            alt={title}
            onClick={() => {
              navigate(`/mealDetail/${mealId}`);
            }}
          />
        </td>
        <td
          onClick={() => {
            navigate(`/mealDetail/${mealId}`);
          }}
        >
          {title}
        </td>
        <td>€ {price} per meal</td>
        <td className="item-quantity">
          <div className="increase-decrease">
            <button className="shopping-cart-btn" onClick={handleDecreaseClick}>
              -
            </button>
            <div className="show-quantity">{quantity}</div>
            <button
              className={
                popup.text ? "shopping-cart-btn-disabled" : "shopping-cart-btn"
              }
              id={mealId}
              onClick={handleIncreaseClick}
            >
              +
            </button>
          </div>
        </td>
        <td>
          <button className="remove-product" onClick={handleRemoveClick}>
            remove
          </button>
        </td>
        <td>€ {total}</td>
      </tr>
    </tbody>
  );
};
ShoppingCartCard.propTypes = {
  image: propTypes.string,
  title: propTypes.string,
  quantity: propTypes.number,
  price: propTypes.number,
  mealId: propTypes.string,
  total: propTypes.string,
  availableQuantity: propTypes.number,
};
export default ShoppingCartCard;
