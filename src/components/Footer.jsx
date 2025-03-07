import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "../components/Footer.css"



const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="section__container footer__container">
        <div className="footer__col">
          <div className="footer__logo">
            <a href="#" className="logo">elegance.shop</a>
          </div>
          <p>
          Elevate your style with dresses that exude elegance and sophistication—where fashion meets timeless beauty effortlessly ✨👗.
          </p>
          <ul className="footer__socials">
            <li><a href="#"><FaFacebookF /></a></li>
            <li><a href="#"><FaTwitter /></a></li>
            <li><a href="https://www.linkedin.com/in/sudesh02/"><FaLinkedinIn /></a></li>
            <li><a href="https://github.com/TN43Y4543"><FaGithub /></a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul className="footer__links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Resources</h4>
          <ul className="footer__links">
            <li><a href="#">Pricing</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact Support</a></li>

          </ul>
        </div>

        <div className="footer__col">
          <h4>Support</h4>
          <ul className="footer__links">
            <li><a href="#">Contact</a></li>
            <li><a href="#">Affiliates</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        Copyright © 2024 elegance.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;