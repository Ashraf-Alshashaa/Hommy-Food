import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authentication";
import PropTypes from "prop-types";
import InputForm from "../InputForm";
import { MsgPopupContext } from "../../contexts/msgPopup";
import "./style.css";

const EditFromPopUp = ({ setOpenModal, setChefInfo }) => {
  const { setPopup } = useContext(MsgPopupContext);
  const { user, setUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [fullName, setFullName] = useState(user?.fullName);
  const [values, setValues] = useState({});

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${process.env.BASE_SERVER_URL}/api/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setChefInfo(result?.result);
        setPopup({
          type: "success",
          text: "Your personal information was successfully updated",
          open: true,
        });
        setOpenModal(false);
        setUser(result?.result);
      } else {
        setPopup({
          type: "error",
          text: result.msg,
          open: true,
        });
      }
    } catch (error) {
      setPopup({
        type: "error",
        text: "sorry something went wrong",
        open: true,
      });
    }
  };

  useEffect(() => {
    if (fullName?.first || fullName?.last) {
      setData({
        ...values,
        fullName,
      });
    } else {
      setData(values);
    }
  }, [values, fullName]);

  return (
    <div className="profile-popup-container">
      <div className="personal-popup-field">
        <div className="popup-bar-header">
          <div className="close-bar">
            <p className="popup-desc">Update information</p>
            <button
              className="popup-close-icon-btn"
              onClick={() => setOpenModal(false)}
            >
              <i id="popup-close-x" className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <form className="popup-input-field" onSubmit={handleSubmit}>
          <InputForm
            className="update-input-container"
            name="userName"
            type="text"
            placeholder={user.userName}
            label="User name"
            pattern="^[A-Za-z0-9]{3,10}$"
            value={values["userName"] || ""}
            onChange={onChange}
          />
          <InputForm
            className="update-input-container"
            name="first"
            type="text"
            placeholder={user?.fullName?.first ? user?.fullName?.first : ""}
            label="First name"
            value={values["first"]}
            onChange={(e) =>
              setFullName({ ...fullName, first: e.target.value })
            }
          />
          <InputForm
            className="update-input-container"
            name="last"
            type="text"
            placeholder={user?.fullName?.last ? user?.fullName?.last : ""}
            label="Last Name"
            value={values["last"]}
            onChange={(e) => setFullName({ ...fullName, last: e.target.value })}
          />
          <InputForm
            className="update-input-container"
            name="address"
            type="text"
            placeholder={user.address}
            label="Address"
            value={values["address"] || ""}
            onChange={onChange}
          />
          <InputForm
            className="update-input-container"
            name="phone"
            type="text"
            pattern="^[0-9]{9,10}$"
            placeholder={user.phone}
            label="Phone number"
            value={values["phone"] || ""}
            onChange={onChange}
          />
          <div className="submit-update-container">
            <button
              id="popup-back-btn"
              type="button"
              onClick={() => setOpenModal(false)}
            >
              Back
            </button>
            <button id="popup-close-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditFromPopUp.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  setChefInfo: PropTypes.func.isRequired,
};

export default EditFromPopUp;
