import React from "react";
import { Link } from "react-router-dom";
import { FooterStyle } from "./style";

export const Footer = () => {
  return (
    <FooterStyle>
      <div className="footerbox">
        <div className="buttons">
          <Link to={`/contact`}>
            <button>Contact</button>
          </Link>
          <Link to={`/team`}>
            <button>Work with Us</button>
          </Link>
        </div>
        <div className="foot_cont">
          <p>Opening times: Monday to Saturday 9h - 18h</p>
          <p>Email: soyhenry@gmail.com</p>
        </div>
        <div className="footerinfo2">
          <p>Thank you for choosing our services.</p>
          <p className="adv">
            We protect your customer data with our stringent security standards.
          </p>
          <p>This page is a project made by students of SoyHenry/Cohorte 7</p>
          <a href="https://www.soyhenry.com/">Henry</a>
          <p>Copyright © 2021 dubSnip</p>
        </div>
      </div>
    </FooterStyle>
  );
};

export default Footer;
