import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthVerify from '../helper/JWTVerify';
import { useNavigate } from 'react-router-dom';
import { Translate } from '@mui/icons-material';

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
            )
            setLoading(false);
            if (response.data.message === 'Registration Successful') {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("role", response.data.role)
                setSuccess(true)
            }
            else {
                setError(true);
                setErrorMessage(response.data.message)
            }
        } catch (err) {
            setLoading(false);
            setError(true);
            setErrorMessage(err.response.data.message)
        }
    };

    const token = localStorage.getItem('token')
    useEffect(() => {
        setLoading(true);
        if (AuthVerify(token)) navigate('/profile');
        setLoading(false);
    }, [])

    return (
        <div style={{ backgroundImage: 'url("https://img.freepik.com/premium-photo/abstract-blur-library-blurred-book-shelves-hall-generative-ai_791316-6098.jpg")', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { marginBottom: '16px' },
                    '& .MuiButton-root': { marginTop: '16px' },
                    width: '500px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Set a background color for the form
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
                noValidate
                autoComplete="off"
            >
                <div >
                    <h1 style={{
                        fontFamily: 'Raleway, sans-serif',
                        color: '#3498db',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                        marginBottom: '20px',
                        marginLeft: '60px'
                    }}>College-Connect</h1>
                    <TextField
                        required
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Admission No"
                        name="admission_no"
                        value={formData.admission_no}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                    />
                </div>
                <Button onClick={handleSubmit} variant="contained" fullWidth>
                    Register
                </Button>
                {success && <div>Registration Successful</div>}
                {error && <div>{errorMessage}</div>}
                {loading && <div>Registering</div>}
            </Box >
        </div >
    );
}
