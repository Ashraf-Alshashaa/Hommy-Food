import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import "./style.css";
import Logo from "../../../public/images/Login&SignUp-logo.png";
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [data, setData] = useState(null);
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChef: "user",
  });

  // Creating an array of input
  const inputs = [
    {
      id: 1,
      name: "userName",
      type: "text",
      placeholder: "User name",
      errorMessage: "3~10 characters without any special character!",
      pattern: "^[A-Za-z0-9]{3,10}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "email@example.com",
      errorMessage: "It should be a valid email address!",

      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "8~20 characters include 1 num, 1 special character!",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
      errorMessage: "Passwords don't match!",
      pattern: values.password,
      required: true,
    },
  ];

  // Handling the submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/user/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result.success) {
        navigate("/login", { replace: true });
      } else {
        setMsg(result.msg);
      }
    } catch (error) {
      setMsg("sorry something went wrong");
    }
  };

  // Getting the input value.
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // update data for server
  useEffect(() => {
    setData({
      userName: values.userName,
      email: values.email,
      password: values.password,
      isChef: values.isChef === "chef",
    });
  }, [values]);

  return (
    <div className="signUp-page">
      <form onSubmit={handleSubmit} className="signUp-page-form">
        <img src={Logo} width="200px" alt="logo" className="signUp-page-logo" />
        {inputs.map((input) => (
          <InputForm
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            className="signUp-input"
          />
        ))}
        <div className="check-container">
          <div className="chef-field">
            <input
              type="radio"
              id="chef"
              name="isChef"
              value="chef"
              checked={values.isChef == "chef"}
              onChange={onChange}
            />
            <label htmlFor="chef" className="checker-label">
              Chef
            </label>
          </div>
          <div className="user-field">
            <input
              type="radio"
              id="user"
              name="isChef"
              value="user"
              checked={values.isChef == "user"}
              onChange={onChange}
            />
            <label htmlFor="user" className="checker-label">
              User
            </label>
          </div>
        </div>
        <p className="chef-profile-error-msg">{msg}</p>
        <button className="submit-btn">Submit</button>
        <Link className="link-btn" to="/login">
          <button className="back-btn">Back</button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
