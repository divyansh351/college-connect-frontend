import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
            console.log(formData);
            console.log(token);
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
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={formData.content}
                        name="content"
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

export default PostForm;
