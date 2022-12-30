import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authentication";
import PropTypes from "prop-types";
import avatar from "../../../public/images/img_avatar.png";
import "./style.css";
import RateOfChef from "../RateOfChef";
import EditFromPopUp from "../EditFromPopUp";
import UploadImgWidget from "../UploadImgWidget";
import { useEffect } from "react";
import { MsgPopupContext } from "../../contexts/msgPopup";

const PersonalInfo = ({ id, chefData, setChefData }) => {
  const [openModal, setOpenModal] = useState(false);
  const { setPopup } = useContext(MsgPopupContext);
  const { user, setUser } = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (imgUrl) {
      (async () => {
        const token = localStorage.getItem("accessToken");
        try {
          const response = await fetch(
            `${process.env.BASE_SERVER_URL}/api/user`,
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
          setPopup({
            type: "error",
            text: "sorry something went wrong",
            open: true,
          });
        }
      })();
    }
  }, [imgUrl]);
  return (
    <>
      <div className="personal-info-container">
        <div className="image-container">
          <div className="profile-image">
            {chefData?.photo ? (
              <img
                src={
                  user?._id === chefData?._id ? user?.photo : chefData?.photo
                }
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
            </>
          )}
          <div className="rated-star-comp">
            <RateOfChef number={chefData?.AvgCustomerRates} />
          </div>
        </div>
        <div className="info-container">
          <div className="profile-info-title">
            <h2>Personal information</h2>
          </div>
          <h3>User name: {chefData?.userName}</h3>
          {chefData?.fullName ? (
            <>
              <h3>First name: {chefData?.fullName.first}</h3>
              <h3>Last name: {chefData?.fullName.last}</h3>
            </>
          ) : (
            <>
              <h3>First name:</h3>
              <h3>Last name:</h3>
            </>
          )}
          <h3>e-mail: {chefData?.email}</h3>
          <h3>Address: {chefData?.address}</h3>
          <h3>Phone number: +31 {chefData?.phone}</h3>
          {user?._id === id && (
            <>
              <button
                className="edit-profile-info"
                onClick={() => setOpenModal(true)}
              >
                <i className="fa-solid fa-pen" /> <h3>Edit profile</h3>
              </button>
            </>
          )}
        </div>
      </div>
      {openModal ? (
        <div className="update-profile-popup-container">
          <EditFromPopUp
            setOpenModal={setOpenModal}
            setChefInfo={setChefData}
          />
        </div>
      ) : null}
    </>
  );
};

PersonalInfo.propTypes = {
  id: PropTypes.string.isRequired,
  setChefData: PropTypes.func.isRequired,
  chefData: PropTypes.object,
};

export default PersonalInfo;
