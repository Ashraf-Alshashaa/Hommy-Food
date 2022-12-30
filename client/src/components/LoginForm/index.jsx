import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginLogo from "../../../public/images/login-logo.png";
import { AuthContext } from "../../contexts/authentication";
import "./style.css";
import postLoginInfo from "../../hooks/postLoginInfo";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [onClick, setOnClick] = useState(false);
  const [typePassword, setTypePassword] = useState("password");

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const loginInfo = { email: email, password: password };
  const url = `${process.env.BASE_SERVER_URL}/api/user/login`;

  useEffect(() => {
    (async () => {
      if (onClick) {
        try {
          const response = await postLoginInfo(url, loginInfo);
          if (response.success) {
            const { user, accessToken } = response;
            localStorage.setItem("accessToken", `${accessToken}`);
            setUser(user);
            user.isChef && navigate(`/profile/${user?._id}`, { replace: true });
            !user.isChef && navigate("/", { replace: true });
          } else {
            setMsg(response.msg);
          }
        } catch (error) {
          setMsg("Something went wrong");
        }
      }
    })();
    setOnClick(false);
  }, [onClick]);

  return (
    <section className="login-container">
      <img src={loginLogo} alt="logo" className="login-logo" width="200px" />
      <form className="login-form">
        <div className="logIn-input-container">
          <input
            type="email"
            value={email}
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="logIn-input"
          />
          <div className="password-input">
            <input
              type={typePassword}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="logIn-input"
            />
            <i
              className={
                typePassword === "text"
                  ? "fa-regular fa-eye-slash"
                  : "fa-regular fa-eye"
              }
              onClick={() =>
                typePassword === "password"
                  ? setTypePassword("text")
                  : setTypePassword("password")
              }
            ></i>
          </div>
        </div>
      </form>
      <div className="msg-container">
        <p>{msg}</p>
      </div>
      <div className="btn-login-page-container">
        <button onClick={() => setOnClick(true)} className="btn-login-page ">
          Login
        </button>
        <Link to={"/register"} className="register-link center-children">
          Register
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
