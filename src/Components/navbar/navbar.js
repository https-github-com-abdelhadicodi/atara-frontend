import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import Logo from "../image/atara-logo.png";
import { FaCartPlus } from 'react-icons/fa';
import "./navbar.css";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = () => {
    setDropdownOpen(false); // Close the dropdown when an option is clicked
  };
  
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   isLoggedInCheck();
  // }, []);

  // const isLoggedInCheck = () => {
  //   axios
  //     .get(`http://localhost:4000/user/`, {
  //       headers: { auth_token: cookie.load("auth_token") },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setIsLoggedIn(true);
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response === undefined) {
  //         setIsLoggedIn(false);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     });
  // };

  // const logOut = () => {
  //   cookie.remove("auth_token", { path: "/" });
  //   cookie.remove("user", { path: "/" });
  //   isLoggedInCheck();
  // };

  const menuButton = () => {
    document
      .getElementsByClassName("nav-container")[0]
      .classList.toggle("nav-change");
    document
      .getElementsByClassName("nav-navigation")[0]
      .classList.toggle("nav-show");
    document
      .getElementsByClassName("nav-whole-nav")[0]
      .classList.toggle("nav-vertical");
  };

  return (
    <nav className="nav-whole-nav">
      <div className="nav-logo">
        <Link className="nav-logo-title nav-link" to="/">
          <span className="nav-title"></span>

          <img className="img-nav" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="nav-menu">
        <div className="nav-container" onClick={menuButton}>
          <div className="nav-bar1"></div>
          <div className="nav-bar2"></div>
          <div className="nav-bar3"></div>
        </div>

        <div className="nav-navigation">
          <NavLink to="/" className="nav-link" onClick={menuButton}>
            Home
          </NavLink>
          <NavLink to="/Product" className="nav-link" onClick={menuButton}>
            Product
          </NavLink>
          {/* <NavLink
        to="/Category"
        className={`nav-link ${dropdownOpen ? "active" : ""}`}
        onClick={toggleDropdown}
      >
        Category
        <div className="menu-item">
          <ul className="drop-menu">
            <li className="drop-menu-item">
              <NavLink to="/Category/herbs" onClick={handleOptionClick}>
                Herbs
              </NavLink>
            </li>
            <li className="drop-menu-item">
              <NavLink to="/Category/spices" onClick={handleOptionClick}>
                Spices
              </NavLink>
            </li>
          </ul>
        </div>
      </NavLink> */}
          <NavLink to="/AboutUs" className="nav-link" onClick={menuButton}>
            About Us
          </NavLink>
          <NavLink to="/cartPage" className="nav-link" onClick={menuButton}>
  <FaCartPlus />
</NavLink>
          {/* {!isLoggedIn ? ( */}
            <>
              <Link
                id="nav-login"
                className="nav-link"
                to="/login"
                onClick={menuButton}>
                Login
              </Link>
              
            </>
          {/* ) : (
            <Link
              to="/"
              id="nav-logout"
              className="nav-link"
              onClick={menuButton}>
              Logout
            </Link>
          )} */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;