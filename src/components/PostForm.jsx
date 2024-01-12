import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const PostForm = ({ course_id }) => {
    const [formData, setformData] = useState({
        title: '',
        content: '',
        course_id: course_id
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
                `https://college-connect-backend-0x0i.onrender.com/post/new`,
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
                setErrorMessage(response.data.message)
                setError(true);
            }
        } catch (err) {
            setLoading(false);
            setError(true);
            setErrorMessage(err.response.data.message)
        }
    };
    return (
        <div>
            <Box
                className="form-box"
                component="form"
                noValidate
                autoComplete="off"
                style={{ margin: '10px 0 10px 0', alignItems: 'flex-start', width: '90%', height: '20%' }}
            >
                <TextField
                    required
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    style={{ marginTop: '' }}
                />
                <TextField
                    required
                    label="Content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    style={{ marginTop: '10px' }}
                />
                <button style={{ marginTop: '10px', padding: '4px 8px 4px 8px', fontSize: '95%' }} type="button" onClick={handleSubmit}>
                    Post
                </button>
                {success ? <div>Succesfully Posted</div> : <></>}
                {error ? <div style={{ textTransform: 'capitalize' }}>Please Login</div> : <></>}
                {loading ? <div>Posting</div> : <></>}
            </Box>
        </div>
    );
};

export default PostForm;
