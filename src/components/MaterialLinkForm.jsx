import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const MaterialLinkForm = ({ course_id }) => {
    const [formData, setformData] = useState({
        course_id: course_id,
        title: '',
        link: ''
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
                `https://college-connect-backend-0x0i.onrender.com/course/add_material_link`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setLoading(false);
            if (response.data.message == 'material link succesfully saved') {
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
                    label="Link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    style={{ marginTop: '10px' }}
                />
                <button style={{ marginTop: '10px', padding: '4px 8px 4px 8px', fontSize: '95%' }} type="button" onClick={handleSubmit}>
                    Add
                </button>
                {success ? <div>Successfully Uploaded</div> : <></>}
                {error ? <div>{errorMessage}</div> : <></>}
                {loading ? <div>Uploading</div> : <></>}
            </Box>
        </div>
    );
};

export default MaterialLinkForm;
