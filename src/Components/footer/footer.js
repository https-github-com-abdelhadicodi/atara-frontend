import React from 'react';
import "./footer.css";
import { FaFacebook, FaInstagram, FaPhone } from 'react-icons/fa';

export default function Footer() {
    const handleSignUpClick = () => {
        window.location.href = '/login';
      };
  return (
<footer class="footer-container">
  <div class="footer">
    <div class="footer-heading">
      <h2>About Us</h2>
      <h3>Atara Online's goal is to provide high quality products</h3>
      <h3> and the most important health products</h3>
    </div>

    <div class="footer-heading-link">
      <h2>Contact Us</h2>
      <a href="#">
        <FaFacebook /> atara-online
      </a>
      <a href="#">
        <FaInstagram /> @atara-online
      </a>
      <a href="#">
        <FaPhone /> 71/ 123 456
      </a>
    </div>

    <div class="footer-email-form">
      <h2>Join our website</h2>
      <input type="submit" value="Sign Up" id="footer-email-btn" onClick={handleSignUpClick}/>
    </div>
  </div>
</footer>
  );
}
