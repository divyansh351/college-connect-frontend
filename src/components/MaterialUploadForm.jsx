import React, { useState } from 'react';
import axios from 'axios';

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
        console.log(material);
        for (const mat of material) { // images is an array of File Object
            ReactFormData.append('material', mat, mat.name); // multiple upload
        }

        try {
            console.log(token);
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
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="material">Material (PDF ONLY):</label>
                    <input
                        type="file"
                        id="material"
                        name="material"
                        onChange={handleMaterialChange}
                    />
                </div>
                <button type="button" onClick={handleSubmit}>
                    Post
                </button>
            </form>
            {success ? <div>Registration Successful</div> : <></>}
            {error ? <div>{errorMessage}</div> : <></>}
            {loading ? <div>Registering</div> : <></>}
        </div>
    );
};

export default MaterialUploadForm;
