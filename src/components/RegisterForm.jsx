import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthVerify from '../helper/JWTVerify';
import { useNavigate } from 'react-router-dom';


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
            if (response.data.message == 'Registration Successful') {
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
        <>
            <h1>Registration Form</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Admission_No"
                        name="admission_no"
                        value={formData.admission_no}
                        onChange={handleChange}
                    />
                    <TextField
                        required id="outlined-password-input"
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        required id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
            </Box>
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
            {success ? <div>Registration Successful</div> : <></>}
            {error ? <div>{errorMessage}</div> : <></>}
            {loading ? <div>Registering</div> : <></>}
        </>
    );
}
