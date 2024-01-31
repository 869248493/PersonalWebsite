import React from "react";
import smile from "../modules/assets/smile.png";
import email from "../modules/assets/mail.png";

import "./Contact.css";

const Contact = () => {
  return (
    <div className="u-container">
      <div class="u-title">Contact</div>
      <div class="Contact-content">
        <img src={smile} />
        <div className="Contact-mail">
          <div className="u-bold">Feel free to email me!</div>
          <a id="emailMe" href="mailto:example@website.com">
            <img className="mail" src={email} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
