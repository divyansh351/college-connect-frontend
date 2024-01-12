import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const CommentForm = ({ post_id }) => {
    const [formData, setformData] = useState({
        content: '',
        post_id: post_id
    })
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
        const token = localStorage.getItem('token');


        try {
            const response = await axios.post(
                `https://college-connect-backend-0x0i.onrender.com/comment/new`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setLoading(false);
            if (response.data.message == 'successfully posted') {
                setSuccess(true)
                window.location.reload();
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
            <Box
                className="form-box"
                component="form"
                noValidate
                autoComplete="off"
                style={{ margin: '10px 0 10px 0', alignItems: 'flex-start', width: '90%', height: '10%' }}
            >
                <TextField
                    required
                    label="Comment"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    style={{ margin: '0 0 0 0' }}
                />
                <button style={{ marginTop: '10px', padding: '4px 8px 4px 8px', fontSize: '95%' }} type="button" onClick={handleSubmit}>
                    Comment
                </button>

                {success ? <div>Comment Posted</div> : <></>}
                {error ? <div>{errorMessage}</div> : <></>}
                {loading ? <div>Posting</div> : <></>}
            </Box>
        </>
    );
};

export default CommentForm;
