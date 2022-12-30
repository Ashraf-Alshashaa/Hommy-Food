import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Banner from "../../components/Banner";
import TEST_ID from "./Home.testid";
import CuisineListButtons from "../../components/CuisineListButtons";
import CategoryListCards from "../../components/CategoryListCards";
import TopTenChefsSlider from "../../components/TopTenChefsSlider";
import SearchField from "../../components/SearchField";
import Footer from "../../components/Footer";
import useFetch from "../../hooks/useFetch";
import "./style.css";
import wood from "../../../public/images/wood.png";

const Home = () => {
  const [categories, setCategories] = useState();
  const [topTenChefs, setTopTenChefs] = useState();
  const [cuisines, setCuisines] = useState();
  const {
    isLoading: isLoadingCuisines,
    // error: errorCuisines,
    performFetch: getCuisines,
  } = useFetch("/cuisines", setCuisines);
  const {
    isLoading: isLoadingCategories,
    // error: errorCategories,
    performFetch: getCategories,
  } = useFetch("/categories", setCategories);

  const {
    isLoading: isLoadingTopTenChefs,
    // error: errorTopTenChefs,
    performFetch: getTopTenChefs,
  } = useFetch("/rate/chefs/high-rated", setTopTenChefs);

  useEffect(() => {
    getTopTenChefs();
    getCategories();
    getCuisines();
  }, []);

  const isLoading =
    isLoadingCategories || isLoadingTopTenChefs || isLoadingCuisines;
  // const error = errorCategories || errorTopTenChefs;
  if (isLoading) {
    return (
      <div className="home-main-container">
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
    <div data-testid={TEST_ID.container}>
      <section className="home-main-container">
        <section className="banner-container">
          <Banner />
        </section>
        <section className="search-section center-children">
          <SearchField />
        </section>
        <section className="cuisines-section">
          <CuisineListButtons cuisines={cuisines?.result} />
        </section>
        <section className="categories-container">
          <img src={wood} className="categories-container-background" />
          {categories?.result?.map((category) => (
            <CategoryListCards key={category._id} category={category} />
          ))}
        </section>
        <section className="top-10-chefs-container">
          <h3 className="top-10-chefs-title">top 10 chefs</h3>
          <TopTenChefsSlider topTenChefs={topTenChefs} />
        </section>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
