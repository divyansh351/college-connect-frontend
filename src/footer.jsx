// Footer.js

import React from 'react';
import './Footer.css'; // Import the external stylesheet

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="logo-container">
                <img
                    src="https://collegeconnect.co.in/images/logo-main-header.png"
                    alt="Footer Logo"
                    className="logo-image"
                />
            </div>
            <div className="contributors-container">
                <div className="contributor">
                    <h4>Contributor 1</h4>
                    <p>Name: John Doe</p>
                    <p>Contact: john@example.com</p>
                </div>
                <div className="contributor">
                    <h4>Contributor 2</h4>
                    <p>Name: Jane Smith</p>
                    <p>Contact: jane@example.com</p>
                </div>
                <div className="contributor">
                    <h4>Contributor 3</h4>
                    <p>Name: Bob Johnson</p>
                    <p>Contact: bob@example.com</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
