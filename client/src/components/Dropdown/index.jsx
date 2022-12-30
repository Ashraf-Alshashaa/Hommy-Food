import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

const Dropdown = ({ data, displayText, onClick }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleOpen = () => open && setOpen(false);

    window.addEventListener("click", handleOpen);

    return () => {
      window.removeEventListener("click", handleOpen);
    };
  }, [open]);

  return (
    <div className="dropdown">
      <div
        className="category-select"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p>{displayText}</p>
        <i className="fa fa-caret-down" />
      </div>
      <div className={`dropdown-options-menu ${open ? "active" : "inactive"}`}>
        <ul>
          {data?.map((elm) => (
            <li
              className="dropdown-options"
              key={elm._id}
              id={elm._id}
              onClick={onClick}
            >
              {elm.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.array,
  displayText: PropTypes.string,
};

export default Dropdown;
