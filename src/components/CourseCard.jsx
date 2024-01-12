import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseCard.css';
import { useNavigate } from 'react-router-dom';
const CourseCard = ({ id, linkDisable = false }) => {
    const [courseInfo, setCourseInfo] = useState({
        id: '',
        name: '',
        instructor: '',
        code: '',
        description: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const response = await axios.get(`https://college-connect-backend-0x0i.onrender.com/course/${id}`);
                setCourseInfo(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(id);
    }, [id]);

    // if (loading) {
    //     return <p>Loading...</p>; // You can customize this loading indicator
    // }

    if (error) {
        return <p>Error: {error}</p>; // Display an error message
    }

    const { name, instructor, code, description } = courseInfo;

    return (
        <div
            onClick={linkDisable ? () => { } : () => navigate(`/course/${id}`)}
            style={linkDisable ? {} : { "cursor": "pointer" }}
            className="course-card"
        >
            {/*<img src={image} alt={name} className="course-image" />*/}
            <div className="course-details">
                <h2 className="course-name">{name}</h2>
                <p className="dett">Course Code:<strong> {code}</strong></p>
                <p className="dett">Details:<strong style={{ textTransform: 'uppercase' }}> {description}</strong></p>
            </div>
        </div>
    );
};

export default CourseCard;
