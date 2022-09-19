import React, { useState } from "react";
//import { Button } from "./button.js";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ authorized }) {
  const [click, setClick] = useState(false);
  //const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            AUMMS
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          {authorized ? (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/search"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/logout"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
