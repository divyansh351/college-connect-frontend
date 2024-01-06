// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="header">
                <h1>College Connect</h1>
                <p>Welcome to College Connect, dedicated to the students of IIT (ISM) Dhanbad. Our platform is designed
                    to help you discover and understand the wealth of courses offered at your esteemed institution.</p>
                <a href="/course" className="cta-button">View Courses</a>
            </header>
        </div>
    );
}

export default LandingPage;
