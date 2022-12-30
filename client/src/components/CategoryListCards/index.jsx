import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

const CategoryListCards = ({ category }) => {
  const { _id, image, title } = category;

  return (
    <div key={_id} className="category-card">
      <Link to={`/results?category=${_id}`}>
        <img src={image} alt={title} />
      </Link>
      <h5>{title}</h5>
    </div>
  );
};

CategoryListCards.propTypes = {
  category: PropTypes.object.isRequired,
};

export default CategoryListCards;
