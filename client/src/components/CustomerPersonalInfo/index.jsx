import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authentication";
import PropTypes from "prop-types";
import avatar from "../../../public/images/img_avatar.png";
import "./style.css";
import EditFromPopUp from "../EditFromPopUp";
import UploadImgWidget from "../UploadImgWidget";
import OrdersHistoryCard from "../OrderHistoryCard";

const PersonalInfo = ({ id }) => {
  const [openModal, setOpenModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [userData, setUserData] = useState(user);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    setUserData(user);
  }, [user]);
  useEffect(() => {
    if (imgUrl) {
      (async () => {
        const token = localStorage.getItem("accessToken");
        try {
          const response = await fetch(
            `${process.env.BASE_SERVER_URL}/api/user/`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ photo: imgUrl }),
            }
          );
          const res = await response.json();
          setUser(res?.result);
        } catch (error) {
          setMsg("sorry something went wrong");
        }
      })();
    }
  }, [imgUrl]);

  const lastThreeOrders = user.orderHistory.slice(-3);
  return (
    <>
      <div className="customer-personal-info-container">
        <div className="customer-image-container">
          <div className="profile-image">
            {user?.photo ? (
              <img
                src={user?.photo}
                alt="user image"
                className="user-profile-img"
              />
            ) : (
              <img src={avatar} alt="user image" className="user-profile-img" />
            )}
          </div>
          {user?._id === id && (
            <>
              <UploadImgWidget
                folderName="profilePicture"
                setImgUrl={setImgUrl}
                className="upload-profile-image"
              />
              <p className="chef-profile-error-msg">{msg}</p>
            </>
          )}
        </div>
        <div className="customer-info-container">
          <div className="customer-profile-info-title">
            <h2>Personal information</h2>
          </div>
          <h3>User name: {userData?.userName}</h3>
          {userData?.fullName ? (
            <>
              <h3>First name: {userData?.fullName.first}</h3>
              <h3>Last name: {userData?.fullName.last}</h3>
            </>
          ) : (
            <>
              <h3>First name:</h3>
              <h3>Last name:</h3>
            </>
          )}
          <h3>E-mail: {userData?.email}</h3>
          <h3>Address: {userData?.address}</h3>
          <h3>Phone number: {userData?.phone}</h3>
          {userData?._id === id && (
            <>
              <button
                className="edit-customer-profile-info"
                onClick={() => setOpenModal(true)}
              >
                <i className="fa-solid fa-pen" /> <h3>Edit profile</h3>
              </button>
              <p className="customer-profile-error-msg">{msg}</p>
            </>
          )}
        </div>
      </div>
      {lastThreeOrders.length !== 0 && (
        <div className="customer-personal-info-container">
          <div className="customer-order-history-container">
            <div className="profile-last-orders-title">
              <h2>Recent orders</h2>
            </div>
            <div className="customer-orders-history">
              {lastThreeOrders?.reverse().map((order, index) => {
                return (
                  <div key={index}>
                    <OrdersHistoryCard order={order} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {openModal ? (
        <div className="update-profile-popup-container">
          <EditFromPopUp
            setOpenModal={setOpenModal}
            setChefInfo={setUserData}
          />
        </div>
      ) : null}
    </>
  );
};

PersonalInfo.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PersonalInfo;
