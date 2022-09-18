import React from "react";
import "./Footer.css";
//import { Button } from "./Button";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join Us To Acquire Our University Student Friendly Mentorship
        </p>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>
              <Link to="/register">Sign Up</Link>
              <br></br>
            </h2>
          </div>
          <div className="footer-link-items">
            <h2>
              <Link to="/login">Login</Link>
              <br></br>
            </h2>
          </div>

          <div className="footer-link-items">
            <h2>Social Media</h2>
            <Link to="/" target="_blank">
              Instagram
            </Link>
            <Link to="/" target="_blank">
              Facebook
            </Link>
            <Link to="/" target="_blank">
              Youtube
            </Link>
            <Link to="/" target="_blank">
              Twitter
            </Link>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              AUMMS
              <i className="fab fa-typo3" />
            </Link>
          </div>
          <small className="website-rights">AUMMS © 2022</small>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
