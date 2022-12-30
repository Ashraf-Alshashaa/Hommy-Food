import React, { useRef, useContext } from "react";
import emailjs from "@emailjs/browser";
import { MsgPopupContext } from "../../contexts/msgPopup";

import "./style.css";
import logo from "../../../public/images/logo.png";

const Footer = () => {
  const { setPopup } = useContext(MsgPopupContext);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    try {
      emailjs.sendForm(
        process.env.SERVICE_ID,
        process.env.TEMPLATE_ID,
        form.current,
        process.env.PUBLIC_KEY
      );
      setPopup({
        type: "success",
        text: "you message send successfully",
        open: true,
      });
    } catch (error) {
      setPopup({ type: "error", text: "something went wrong", open: true });
    }
  };

  const text = `Hommy Food app is the perfect companion for selling homemade food online.
  This app allow you to set up an account, make schedules, secure payments,
  add photos, set prices, and receive  ratings `;

  return (
    <div className="footer-container">
      <div className="background-gray"></div>
      <div className="about-us">
        <img src={logo} alt="logo" />
        <p>{text}</p>
        <div className="develop-by-container">
          <h5>&copy; Ashraf Alshashaa</h5>
          <ul className="social-icons">
            <li>
              <a href="https://www.instagram.com/ashraf_alshashaa/">
                <i className="fa-brands fa-square-instagram"></i>
              </a>
            </li>
            <li>
              <a href=" https://www.facebook.com/ashraf13795">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ashraf-alshashaa/">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href=" https://github.com/Ashraf-Alshashaa">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <form className="feedback-form" ref={form} onSubmit={sendEmail}>
        <h3>Feedback</h3>
        <input type="text" name="user_name" placeholder="Your Name" />
        <input type="email" name="user_email" placeholder="Your Email" />
        <textarea name="message" placeholder="Your Message" />
        <button className="feedback-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Footer;
