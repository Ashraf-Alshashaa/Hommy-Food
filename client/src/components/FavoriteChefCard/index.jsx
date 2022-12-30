import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import "./style.css";
import RateOfChef from "../RateOfChef";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authentication";
import { MsgPopupContext } from "../../contexts/msgPopup";
import somethingWentWrong from "../../../public/images/something-went-wrong.png";
import PulseLoader from "react-spinners/PulseLoader";

const FavoriteChefCard = ({ id }) => {
  const [chef, setChef] = useState();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { setPopup } = useContext(MsgPopupContext);
  const { performFetch, isLoading, error } = useFetch(
    `/user/chef/${id}`,
    (data) => setChef(data?.result)
  );
  const { performFetch: performFetchRemoveChef } = useFetch(
    "/user/favorite",
    (data) => setUser(data?.result)
  );

  useEffect(() => {
    performFetch();
  }, []);
  const removeFavorite = () => {
    const token = localStorage.getItem("accessToken");
    performFetchRemoveChef({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chefId: id }),
    });
    setPopup({
      type: "error",
      text: `Chef ${chef?.userName} is removed from favorite`,
      open: true,
    });
  };

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
    <div className="favorite-chef-card-container">
      <i
        className="fa-solid fa-heart-crack"
        data-hover="Remove from favorites"
        onClick={removeFavorite}
      ></i>
      <div
        className="favorite-chef-image-container"
        onClick={() => navigate(`/profile/${id}`)}
      >
        <div className="favorite-chef-profile-image">
          <img
            src={chef?.photo}
            alt="chef image"
            className="favorite-chef-profile-img"
          />
        </div>
        <div className="rated-star-comp">
          <RateOfChef number={chef?.AvgCustomerRates} />
        </div>
      </div>
      <div
        className="favorite-chef-info-container"
        onClick={() => navigate(`/profile/${id}`)}
      >
        <h2>Chef {chef?.userName}</h2>
        <h3>
          e-mail: <span>{chef?.email}</span>
        </h3>
        <h3>
          Address: <span>{chef?.address}</span>
        </h3>
        <h3>
          Phone number: <span>{chef?.phone}</span>
        </h3>
        <h3>
          Service type:{" "}
          <span className="favorite-chef-delivery-type">
            {chef?.deliveryType}
          </span>{" "}
        </h3>
      </div>
    </div>
  );
};

FavoriteChefCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FavoriteChefCard;
