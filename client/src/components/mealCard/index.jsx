import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import brush from "../../../public/images/brush.png";
import "./style.css";

import ShoppingCart from "../ShoppingCart";
const MealCard = ({
  id,
  image,
  title,
  quantity,
  chefName,
  price,
  delivery,
  chefImage,
  chefId,
}) => {
  return (
    <>
      <article className=" result-meal-card card p-3 m-2">
        <div className="result">
          <h3>{title?.length > 12 ? title.substring(0, 11) + "..." : title}</h3>
          <div className="delivery">{delivery}</div>
        </div>
        <div className="result-meal-card-image">
          <Link className="image-Container" to={`/mealDetail/${id}`}>
            <img src={image} className="card-img-top" alt={title} />
          </Link>
        </div>
        <div className="chef-container">
          <div className="chef">
            <Link to={`/profile/${chefId}`}>
              <div className="chip">
                {chefImage ? (
                  <img src={chefImage} alt="Person" width="96" height="96" />
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}
                {chefName}
              </div>
            </Link>
            <h4>{quantity} Left</h4>
          </div>
        </div>
        <div className="order-type-container">
          <div className="title">
            <p className="price">€{price}</p>
            <img src={brush} alt="brush" width="96" height="96" />
          </div>
          <>
            <ShoppingCart chefId={chefId} id={id} quantityLeft={quantity} />
          </>
        </div>
      </article>
    </>
  );
};
MealCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  chefImage: PropTypes.string,
  chefName: PropTypes.string,
  chefId: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  id: PropTypes.string.isRequired,
  delivery: PropTypes.string,
};
export default MealCard;
