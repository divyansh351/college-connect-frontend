// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css';

const LandingPage = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload();
    }

    return (
        <div className="landing-page">
            <header className="header">
                <div className="top-links">
                    {localStorage.token ?
                        <>
                            <a href="/profile" className="top-link">Profile</a>
                            <a onClick={handleLogout} style={{ cursor: 'pointer' }} className="top-link">Logout</a>
                        </>
                        :
                        <>
                            <a href="/login" className="top-link">Login</a>
                            <a href="/register" className="top-link">Register</a>
                        </>
                    }
                </div>
                <h1 className='land-heading'>College Connect</h1>
                <p>Welcome to College Connect, dedicated to the students of IIT (ISM) Dhanbad. Our platform is designed
                    to help you discover and understand the wealth of courses offered at your esteemed institution.</p>
                <a href="/course" className="cta-button">View Courses</a>
            </header>
        </div>
    );
}

export default LandingPage;
