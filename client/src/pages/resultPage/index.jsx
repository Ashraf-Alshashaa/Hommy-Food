import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MealCard from "../../components/mealCard";
import useFetch from "../../hooks/useFetch";
import sadChef from "../../../public/images/Sad-chef.png";
import somethingWentWrong from "../../../public/images/something-went-wrong.png";
import PulseLoader from "react-spinners/PulseLoader";
import "./style.css";

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const query = searchParams.get("search");
  const category = searchParams.get("category");
  const cuisine = searchParams.get("cuisine");
  const {
    performFetch: performSearchFetch,
    isLoading: isLoadingSearch,
    error: errorSearch,
  } = useFetch(`/meals/search?query=${query}`, setData);
  const {
    performFetch: performFilterCategoryFetch,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useFetch(`/meals/filter?category=${category}`, setData);
  const {
    performFetch: performFilterCuisineFetch,
    isLoading: isLoadingCuisine,
    error: errorCuisine,
  } = useFetch(`/meals/filter?cuisine=${cuisine}`, setData);

  useEffect(() => {
    query && performSearchFetch();
    category && performFilterCategoryFetch();
    cuisine && performFilterCuisineFetch();
  }, []);
  const isLoading = isLoadingSearch || isLoadingCuisine || isLoadingCategory;
  const error = errorSearch || errorCategory || errorCuisine;

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

  if (error) {
    return (
      <div className="result-page-container">
        <div className="went-wrong-msg">
          <img src={somethingWentWrong} alt="something went wrong" />
          <h1>Oops!</h1>
          <h5>Something went wrong try again or refresh page</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="result-page-container">
      <div className="result-page">
        <section className="result-meals-card-container">
          {!data?.result?.length > 0 && (
            <div className="meals-not-found">
              <img src={sadChef} alt="sad chef" />
              <h1>Oops!</h1>
              <h5>
                Sorry no meals found go back to <Link to="/">HomePage</Link>
              </h5>
            </div>
          )}
          {data?.result?.map((meal) => (
            <MealCard
              key={meal._id}
              image={meal.image}
              title={meal.title}
              quantity={meal.quantity}
              price={meal.price}
              chefName={meal?.chefId?.userName}
              id={meal._id}
              chefImage={meal.chefId?.photo ? meal.chefId?.photo : null}
              delivery={meal.chefId?.deliveryType}
              chefId={meal.chefId?._id}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
