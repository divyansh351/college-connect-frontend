import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./MaterialCard.css"

const MaterialCard = ({ title, url, uploader }) => {
    const [uploaderName, setUploaderName] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUploader = async (id) => {
            try {
                const response = await axios.get(`https://college-connect-backend-0x0i.onrender.com/user/${id}/get_name`)
                setUploaderName(response.data.name);
            }
            catch (err) {
                setError(true);
                setErrorMessage(err.message);
            }
        };
        fetchUploader(uploader)
    }, [])

    return (
        <div className="material">
            <h4><a href={url}>{title}</a></h4>
            <p>By: {uploaderName}</p>
        </div>
    );
};

export default MaterialCard;
