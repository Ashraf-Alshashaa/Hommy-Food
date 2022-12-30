import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/authentication";
import { Link } from "react-router-dom";
import "./style.css";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import ShoppingCart from "../ShoppingCart";

const MealList = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [chefMeals, setChefMeals] = useState([]);
  const { performFetch } = useFetch(`/meals/my_meals/${id}`, (data) =>
    setChefMeals(data?.result)
  );

  useEffect(() => {
    performFetch();
  }, [id]);

  return (
    <div className="chef-profile-create-meal-container">
      <div className="chef-profile-create-meal-header">
        <div className="chef-profile-meal-list">
          {user?._id === id && (
            <div className="chef-profile-create-meal">
              <Link to={"/create-meal"}>
                <i className="fa-light fa-plus"></i> Create a meal
              </Link>
            </div>
          )}
          <div className="chef-profile-meals-list">
            <h3 className="meals-list-title">Meals list</h3>
          </div>
          <div className="chef-meal-cards-list">
            {chefMeals.map((meal) => {
              return (
                <div className="chef-meal-card-container" key={meal?._id}>
                  <div className="chef-meal-card">
                    <Link
                      to={`/mealDetail/${meal?._id}`}
                      className="chef-meal-card-image-container"
                    >
                      <img src={`${meal?.image}`} alt={meal?.title} />
                    </Link>
                    <div className="chef-meal-card-description-container">
                      <div className="chef-meal-card-container-top">
                        <h3 className="chef-meal-card-title">{meal?.title}</h3>
                        <h5 className="chef-meal-card-qty">
                          Quantity: <p>{meal?.quantity} left</p>
                        </h5>
                        <h5 className="chef-meal-card-price">
                          Price: <p>€{meal?.price}</p>
                        </h5>
                        <h5 className="chef-meal-card-Available">
                          Available:
                          {meal?.isAvailable == true ? <p>Yes</p> : <p>No</p>}
                        </h5>
                      </div>
                      <div className="chef-meal-card-container-bottom">
                        <h5 className="chef-meal-card-cuisine">
                          cuisine: <p>{meal?.cuisine?.title}</p>
                        </h5>
                        <h5 className="chef-meal-card-category">
                          category: <p>{meal?.category?.title}</p>
                        </h5>
                        <h5 className="chef-meal-card-delivery">
                          Delivery type:
                          <p>{meal?.chefId?.deliveryType}</p>
                        </h5>
                        <ShoppingCart
                          id={meal?._id}
                          chefId={meal?.chefId?._id}
                          quantityLeft={meal?.quantity}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

MealList.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MealList;
