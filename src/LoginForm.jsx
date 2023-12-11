import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setformData] = useState({
        username: "",
        password: ""
    })
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


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
                `http://localhost:3000/user/login`,
                formData,
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                }
            )
            console.log(response);
            setLoading(false);
            if (response.data.message == 'Login Successful') {
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
    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

                <div>
                    <h1>Login-Form</h1>
                    <TextField
                        label="Username"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        value={formData.Username}
                        name='username'
                        onChange={handleChange}
                    />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
                            value={formData.Password}
                            name='password'
                            onChange={handleChange}
                        />
                    </FormControl>
                </div>
            </Box>
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
            {success ? <div>Login Succesful</div> : <></>}
            {error ? <div>{errorMessage}</div> : <></>}
            {loading ? <div>Please Wait...</div> : <></>}
        </>
    );
}