import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RateOfChef from "../RateOfChef";
import "./style.css";
import chefImg from "../../../public/images/img_avatar.png";

const TopTenChefsSlider = ({ topTenChefs }) => {
  const [page, setPage] = useState(0);
  const [cardsQuantity, setCardsQuantity] = useState();

  useEffect(() => {
    if (window.innerWidth >= 820) {
      setCardsQuantity(4);
    }
    if (window.innerWidth > 1024) {
      setCardsQuantity(5);
    }
    if (window.innerWidth < 820) {
      setCardsQuantity(3);
    }
    if (window.innerWidth < 600) {
      setCardsQuantity(2);
    }
  }, []);

  let startElemNum = page * cardsQuantity;
  const lastPage = Math.ceil(10 / cardsQuantity) - 1;
  const increasePage = () => {
    page === lastPage ? setPage(0) : setPage(page + 1);
  };
  const decreasePage = () => {
    page === 0 ? setPage(lastPage) : setPage(page - 1);
  };
  if (page === lastPage) {
    startElemNum = 10 - cardsQuantity;
  }

  return (
    <div className="top-ten-chefs-slider">
      <div className="top-10-chefs-cards-container">
        {topTenChefs?.result.map(
          (chef, idx) =>
            idx >= startElemNum &&
            idx < startElemNum + cardsQuantity && (
              <div key={chef._id} className="top-chefs-card-container">
                <Link to={`/profile/${chef._id}`}>
                  <div className="top-chefs-img-container center-children">
                    <img
                      className="chef-card-img"
                      src={chef.photo || chefImg}
                      alt="chef img"
                    />
                  </div>
                  <div className="top-chefs-card-body-container">
                    <h5>{chef.userName}</h5>
                    <RateOfChef number={chef.AvgCustomerRates} />
                  </div>
                </Link>
              </div>
            )
        )}
      </div>
      <button className="decrease-btn" onClick={decreasePage}>
        <i className="fa-solid fa-arrow-left" />
      </button>
      <button className="increase-btn" onClick={increasePage}>
        <i className="fa-solid fa-arrow-right" />
      </button>
    </div>
  );
};

TopTenChefsSlider.propTypes = {
  topTenChefs: PropTypes.object,
};
export default TopTenChefsSlider;
