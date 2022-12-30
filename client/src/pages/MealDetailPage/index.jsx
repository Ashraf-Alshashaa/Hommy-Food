import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PulseLoader from "react-spinners/PulseLoader";
import somethingWentWrong from "../../../public/images/something-went-wrong.png";
import "./style.css";
import ShoppingCart from "../../components/ShoppingCart";

const mealDetailPage = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState([]);
  const { performFetch, isLoading, error } = useFetch(
    `/meals/meal_detail/${mealId}`,
    (data) => setMeal(data?.result)
  );

  useEffect(() => {
    performFetch();
  }, []);
  if (isLoading) {
    return (
      <div className="meal-detail-page-container">
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

  if (error) {
    return (
      <div className="meal-detail-page-container">
        <div className="error">
          <img src={somethingWentWrong} alt="something went wrong" />
          <h1>Oops!</h1>
          <h5>Something went wrong try again or refresh page</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="meal-detail-page-container">
      <article className="meal-Detail-page">
        <section className="meal-page-title">
          <h5>{meal?.title}</h5>
        </section>
        <div className="meal-detail-page-children">
          <aside className="left-side-container">
            <div className="chef-details-container">
              <Link to={`/profile/${meal?.chefId?._id}`} className="chef-name">
                <div className="meal-detail-page-chip-image center-children">
                  {meal?.chefId?.photo ? (
                    <img src={meal?.chefId?.photo} alt="Person" />
                  ) : (
                    <img src={null} alt="Person" />
                  )}
                </div>
                {meal?.chefId?.userName}
              </Link>
              <h5 className="delivery-type">{meal?.chefId?.deliveryType}</h5>
            </div>
            <div className="meal-page-info">
              <h5 className="details">
                Quantity<p> {meal?.quantity}</p>
              </h5>
              <h5 className="details">
                Cuisine <p> {meal?.cuisine?.title}</p>
              </h5>
              <h5 className="details">
                Category <p> {meal?.category?.title}</p>
              </h5>
            </div>
            <div className="meal-page-description">
              <p>
                <strong>Description: </strong>
                {meal?.description}
              </p>
            </div>
            <div className="meal-page-price">
              <p>€{meal?.price}</p>
              <ShoppingCart
                id={mealId}
                chefId={meal?.chefId?._id}
                quantityLeft={meal?.quantity}
              />
            </div>
          </aside>
          <aside className="right-side-container">
            <div className="meal-page-image">
              <img src={meal?.image} alt={meal?.title} />
            </div>
            <div className="meal-page-Ingredients">
              <p>
                <strong>Ingredients: </strong>
                {meal?.ingredients}
              </p>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};

export default mealDetailPage;
