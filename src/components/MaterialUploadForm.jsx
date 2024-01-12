import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const MaterialUploadForm = ({ course_id }) => {
    const [formData, setformData] = useState({
        course_id: course_id,
        title: '',
    })
    const [material, setMaterial] = useState([])
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
        const ReactFormData = new FormData();
        for (let prop in formData) {
            ReactFormData.append(prop, formData[prop]);
        }
        for (const mat of material) { // images is an array of File Object
            ReactFormData.append('material', mat, mat.name); // multiple upload
        }

        try {
            const response = await axios.post(
                `https://college-connect-backend-0x0i.onrender.com/course/add_material_direct`,
                ReactFormData,
                {
                    headers: {
                        'Content-Type': `multipart/form-data`,
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setLoading(false);
            if (response.data.message == 'material succesfully uploaded') {
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


    const handleMaterialChange = (e) => {
        setMaterial(e.target.files);
    }


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
                    style={{ marginBottom: '10px' }}
                />
                <div>
                    <input
                        type="file"
                        className="form-control"
                        id="material"
                        name="material"
                        onChange={handleMaterialChange}
                    />
                </div>
                <button style={{ marginTop: '10px', padding: '4px 8px 4px 8px', fontSize: '95%' }} type="button" onClick={handleSubmit}>
                    Add
                </button>
                {success ? <div>Material Successfully Uploaded</div> : <></>}
                {error ? <div>{errorMessage}</div> : <></>}
                {loading ? <div>Uploading Material</div> : <></>}
            </Box>
        </div>
    );
};

export default MaterialUploadForm;
