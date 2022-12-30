import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";

const SearchField = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <form className="search-container">
        <input
          name={"Search"}
          placeholder={"Find your meal..."}
          type={"text"}
          onChange={handleChange}
          className="search-control"
        />
        <button
          type="submit"
          id="search-btn"
          onClick={() => navigate(`/results?search=${query}`)}
        >
          <i className="fas fa-search search-btn-icon"></i>
        </button>
      </form>
    </>
  );
};
export default SearchField;
