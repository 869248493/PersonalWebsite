import React from "react";
import smile from "../../public/smile.png";
import email from "../../public/mail.png";

import "./Contact.css";

const Contact = () => {
  return (
    <div className="u-container">
      <div className="u-title">Contact</div>
      <div className="Contact-content">
        <img src={smile} />
        <div className="Contact-mail">
          <div className="u-bold">Feel free to email me!</div>
          <a id="emailMe" href="mailto:wanyunze@gmail.com">
            <img className="mail" src={email} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
