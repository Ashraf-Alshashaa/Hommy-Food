import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultUserImg from "../../../public/images/user.png";
import logo from "../../../public/images/logo.png";

import "./style.css";
import { AuthContext } from "../../contexts/authentication";
import { useContext } from "react";
import MsgPopup from "../MsgPopUp";

const Header = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [displayNav, setDisplayNav] = useState(false);
  const desktop = window.innerWidth > 1024;
  const mobile = window.innerWidth < 1024;

  const navLinks = [
    { href: `/profile/${user?._id}`, name: "Profile" },
    {
      href: "/favorite-chefs",
      name: "My Favorite",
      icon: <i className="fa-regular fa-heart nav-bar-heart"></i>,
    },
    { href: "/my-orders", name: "My Orders" },
    {
      href: "/shoppingCart",
      name: "Shopping Cart",
      icon: <i className="fa-solid fa-cart-shopping fa-xl"></i>,
    },
  ];

  useEffect(() => {
    const navLinksListHidden = () => displayNav && setDisplayNav(false);

    window.addEventListener("click", navLinksListHidden);

    return () => {
      window.removeEventListener("click", navLinksListHidden);
    };
  }, [displayNav]);

  const navLinksItemsDesktop = navLinks.map(
    ({ href, name }) =>
      name !== "My Favorite" &&
      name !== "Shopping Cart" && (
        <Link
          to={href}
          key={name}
          className={
            !displayNav
              ? "nav-links-hidden"
              : "nav-links-visible center-children"
          }
        >
          <li>{name}</li>
        </Link>
      )
  );

  const navLinksItemsMobile = navLinks.map(({ href, name }) => (
    <Link
      to={href}
      key={name}
      className={
        !displayNav ? "nav-links-hidden" : "nav-links-visible center-children"
      }
    >
      <li>{name}</li>
    </Link>
  ));

  const favoritesAndCart = navLinks.map(
    ({ href, name, icon }) =>
      (name === "My Favorite" || name === "Shopping Cart") && (
        <Link
          to={href}
          key={name}
          className="nav-links-visible center-children "
        >
          {icon}
        </Link>
      )
  );

  const orderToPrepare = (
    <Link
      to={"/order-to-prepare"}
      className={
        !displayNav ? "nav-links-hidden" : "nav-links-visible center-children"
      }
    >
      to prepare
    </Link>
  );

  const loginBtn = (
    <button
      className="login-header-btn cursor center-children"
      onClick={() => navigate("/login", { replace: true })}
    >
      Login
    </button>
  );

  const logOutBtn = (
    <li
      onClick={() => {
        logout();
        navigate("./", { replace: true });
      }}
      className={
        !displayNav
          ? "nav-links-hidden"
          : "nav-links-visible logout-header-btn cursor center-children"
      }
    >
      Logout
    </li>
  );
  return (
    <header className="header">
      <Link className="logo-container" to="/">
        <img className="logo" src={logo} alt="Hommy food" />
      </Link>
      {user && (
        <div
          onClick={() => desktop && setDisplayNav(!displayNav)}
          className={`user-info-container-header ${user && "cursor"}`}
        >
          <div className="user-img-header-container center-children">
            <img
              src={user && user?.photo ? user.photo : defaultUserImg}
              alt="user"
              className="user-img-header"
            />
          </div>
          <h5 className="user-name-header">Hello {user?.userName || "user"}</h5>
        </div>
      )}
      {mobile && user && (
        <i
          className="fa-solid fa-bars fa-xl nav-btn"
          onClick={() => setDisplayNav(!displayNav)}
        ></i>
      )}
      {mobile && !user && loginBtn}
      <ul className="nav-links-container">
        {user?.isChef && orderToPrepare}
        {desktop ? navLinksItemsDesktop : navLinksItemsMobile}
        {logOutBtn}
      </ul>
      {desktop && (
        <ul className="cart-fav-container">
          {user ? favoritesAndCart : loginBtn}
          <Link
            to={"/shoppingCart"}
            className={`shopping-cart-items-num center-children ${
              !user && "cart-quantity-hidden"
            }`}
          >
            {user?.cart?.length}
          </Link>
        </ul>
      )}
      <MsgPopup />
    </header>
  );
};

export default Header;
