import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";

const CuisineListButtons = ({ cuisines }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeDropDownCuisine = () => open && setOpen(false);

    window.addEventListener("click", closeDropDownCuisine);

    return () => {
      window.removeEventListener("click", closeDropDownCuisine);
    };
  }, [open]);
  return (
    <>
      <ul className="cuisine-container center-children">
        {window.innerWidth > 700 &&
          cuisines?.map(({ _id, title }) => (
            <Link
              className="cuisine-link center-children"
              key={_id}
              to={`/results?cuisine=${_id}`}
            >
              {title}
            </Link>
          ))}
        {window.innerWidth < 700 && (
          <button
            className="select-cuisines-btn"
            onClick={() => setOpen(!open)}
          >
            Select a cuisine
          </button>
        )}
        {window.innerWidth < 700 && (
          <div className="dropdown-cuisine-link-container">
            {cuisines?.map(({ _id, title }) => (
              <Link
                className={
                  open ? "dropdown-cuisine-link" : "cuisine-link-hidden"
                }
                key={_id}
                to={`/results?cuisine=${_id}`}
              >
                {title}
              </Link>
            ))}
          </div>
        )}
      </ul>
    </>
  );
};

CuisineListButtons.propTypes = {
  cuisines: PropTypes.array,
};

export default CuisineListButtons;
