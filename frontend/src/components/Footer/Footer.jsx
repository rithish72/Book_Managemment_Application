import React from 'react';
import './Footer.css';  // Optional: If you have custom styles for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">© 2024 Your Company. All rights reserved.</p>
        <div className="social-icons">
          {/* Add social media links or icons */}
          <a href="#" className="social-icon">Facebook</a>
          <a href="#" className="social-icon">Twitter</a>
          <a href="#" className="social-icon">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
