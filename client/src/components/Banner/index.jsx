import React from "react";
import slogan from "../../../public/images/new-slogan-01.png";
import bannerBackground from "../../../public/images/banner-background.png";
import "./style.css";

const Banner = () => {
  return (
    <div className="hero-section">
      <img
        src={bannerBackground}
        alt="banner background"
        className="banner-background-img"
      />
      <div className="slogan-container">
        <img src={slogan} alt="slogan img" className="slogan" />
      </div>
    </div>
  );
};

export default Banner;
