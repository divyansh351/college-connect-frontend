import React, { useState } from 'react';
import axios from 'axios';

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
            console.log(formData);
            console.log(token);
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
                    <label htmlFor="link">Link:</label>
                    <textarea
                        id="link"
                        value={formData.link}
                        name="link"
                        onChange={handleChange}
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

export default MaterialLinkForm;
