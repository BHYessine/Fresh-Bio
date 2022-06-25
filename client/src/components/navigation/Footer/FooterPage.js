import "./Footer.css";
import React from "react";
import {
  ImFacebook2,
  ImInstagram,
  ImWhatsapp,
  ImYoutube,
} from "react-icons/im";
import { BsPinMapFill, BsTelephone, BsEnvelope } from "react-icons/bs";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="Footer">
      <div className="footerContainer">
        <div className="information">
          <h2>Contact</h2>
          <div className="infoDetails">
            <div className="details">
              <BsPinMapFill className="footerIcon" />
              <p> xxxx street Ariana Tunisia </p>
            </div>
            <div className="details">
              <BsTelephone className="footerIcon" />
              <p> +216.00.000.000 </p>
            </div>
            {/* <div> */}
            <Link to="contact" className="details">
              <BsEnvelope className="footerIcon" />
              <p> contact.freshbio@gmail.com </p>
            </Link>
            {/* </div> */}
          </div>
        </div>
        <div className="footer-description">
          <p className="description">
            Hello, we are "FRESH BIO", a market dedicated to edible products.
            Our products are Bio and Fresh.
          </p>
          <p className="copyright">Fresh Bio © 2021</p>
        </div>

        <div className="information">
          <h2 className="social-title">Follow us :</h2>
          <ul className="infoDetails">
            <li className="details">
              <ImFacebook2 className="footerIcon" />
              <p className="icon-title">FRESH_BIO</p>
            </li>
            <li className="details">
              <ImInstagram className="footerIcon" />
              <p className="icon-title">FRESH_BIO</p>
            </li>
            <li className="details">
              <ImWhatsapp className="footerIcon" />
              <p className="icon-title">FRESH_BIO</p>
            </li>
            <li className="details">
              <ImYoutube className="footerIcon" />
              <p className="icon-title">FRESH_BIO</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
