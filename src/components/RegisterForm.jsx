// RegisterForm.js
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthVerify from '../helper/JWTVerify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterForm.css'; // Import the styles

export default function RegisterForm() {
    const [formData, setformData] = useState({
        name: "",
        email: "",
        admission_no: "",
        username: "",
        password: ""
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (evt) => {
        const fieldName = evt.target.name;
        const value = evt.target.value;
        setformData((currdata) => ({
            ...currdata,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        setLoading(true);
        setSuccess(false);
        setError(false);

        try {
            const response = await axios.post(
                `https://college-connect-backend-0x0i.onrender.com/user/register`,
                formData,
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                }
            );
            setLoading(false);
            if (response.data.message === 'Registration Successful') {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                setSuccess(true);
            } else {
                setError(true);
                setErrorMessage(response.data.message);
            }
        } catch (err) {
            setLoading(false);
            setError(true);
            setErrorMessage(err.response.data.message);
        }
    };

    const token = localStorage.getItem('token');
    useEffect(() => {
        setLoading(true);
        if (AuthVerify(token)) navigate('/profile');
        setLoading(false);
    }, []);

    return (
        <div className="register-form-container">
            <Box
                className="form-box"
                component="form"
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginTop: '20px' }}
                />
                <TextField
                    required
                    label="Admission No"
                    name="admission_no"
                    value={formData.admission_no}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginTop: '20px' }}
                />
                <TextField
                    required
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginTop: '20px' }}
                />
                <TextField
                    required
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginTop: '20px' }}
                />
                <TextField
                    required
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginTop: '20px' }}
                />

                <Button onClick={handleSubmit} variant="contained" fullWidth style={{ marginTop: '20px' }}>
                    Register
                </Button>
                {success && <div>Registration Successful</div>}
                {error && <div>{errorMessage}</div>}
                {loading && <div>Registering</div>}
                <div className="new-user">
                    <p>Already have an account?
                        <a href="/login" className="register-link">Login</a>
                    </p>
                </div>
            </Box>
            <div className="welcome-message">
                <h1 style={{
                    fontFamily: 'Raleway, sans-serif',
                    color: 'gold',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                }}>Welcome to College-Connect!</h1>
                <p style={{ color: 'white' }}>Discover and connect with the courses offered at your institution.</p>
            </div>
        </div>
    );
}
