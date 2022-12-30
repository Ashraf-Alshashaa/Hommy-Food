import React, { useContext, useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/authentication";
import "./style.css";

const RateStar = ({ id, chefData, setChefData }) => {
  const [currentRateValue, setCurrentRateValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [msg, setMsg] = useState("");
  const { user } = useContext(AuthContext);

  // console.log(user);

  const handleClick = (value) => {
    setCurrentRateValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  // Adding a rate to the chef profile
  useEffect(() => {
    if (currentRateValue) {
      (async () => {
        const token = localStorage.getItem("accessToken");
        try {
          const response = await fetch(
            `${process.env.BASE_SERVER_URL}/api/rate`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                rate: currentRateValue,
                chefId: id,
              }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            setChefData(data.result);
            return;
          }
          throw new Error("Http Error");
        } catch (error) {
          setMsg("sorry something went wrong");
        }
      })();
    }
  }, [currentRateValue]);

  // Getting the previous user rate for the current chef
  useEffect(() => {
    if (chefData) {
      const resultRate = chefData?.customerRates?.filter(
        (element) => element.customerId === user?._id
      );
      const filtered = resultRate?.map((element) => element.rate);
      setCurrentRateValue(filtered[0]);
    }
  }, [user, chefData]);

  const stars = Array(5).fill(0);
  return (
    <>
      {(user?.isChef && user?._id === id) || user?._id === undefined ? (
        <></>
      ) : (
        <div className="star-container">
          <h3>Rate the chef</h3>
          <div className="star">
            {stars.map((_, index) => (
              <i
                key={index}
                className={`fa-solid fa-star ${
                  (hoverValue || currentRateValue) > index
                    ? "mouse-in"
                    : "mouse-out"
                }`}
                onClick={() => handleClick(index + 1)}
                onMouseEnter={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
          <p className="chef-profile-error-msg">{msg}</p>
        </div>
      )}
    </>
  );
};

RateStar.propTypes = {
  id: PropTypes.string.isRequired,
  setChefData: PropTypes.func.isRequired,
  chefData: PropTypes.object,
};

export default RateStar;
