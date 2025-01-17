// LoginForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import AuthVerify from '../helper/JWTVerify';
import './LoginForm.css'; // Import the stylesheet

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setformData] = useState({
        username: '',
        password: '',
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
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
                `https://college-connect-backend-0x0i.onrender.com/user/login`,
                formData,
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            );
            setLoading(false);
            if (response.data.message === 'Login Successful') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                setSuccess(true);
                navigate('/profile');
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
        <Box className="login-container">
            <div className="form-container">
                <h1>LogIn</h1>
                <TextField
                    label="Username"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '100%' }}
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                />
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                    />
                </FormControl>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                >
                    Login
                </Button>
                {success ? <div sx={{ color: '#4CAF50', marginTop: '20px' }}>Login Successful</div> : <></>}
                {error ? <div sx={{ color: '#ff0000', marginTop: '20px' }}>{errorMessage}</div> : <></>}
                {loading ? <div sx={{ marginTop: '20px' }}>Please Wait...</div> : <></>}
                <div className="new-user">
                    <p>Don't have an account?
                        <a href="/register" className="register-link">Register</a>
                    </p>
                </div>
            </div>
            <div className="welcome-message">
                <h1 style={{
                    fontFamily: 'Raleway, sans-serif',
                    color: 'gold',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                }}>Welcome to Campus-Connect!</h1>
                <p className="hidden-ph" style={{ color: 'white' }}>Discover and connect with the courses offered at your institution.</p>
            </div>
        </Box>
    );
}
