import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SingleCourse.css'; // Import the external stylesheet
import PostList from './PostList';
const CourseCard = ({ id }) => {
    const [courseInfo, setCourseInfo] = useState({
        name: '',
        instructor: '',
        code: '',
    });
    const image = 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/software_engineer.jpeg.jpg'
    const department = 'Computer Science'
    const OfferedInSemester = 'Winter'
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <p>Loading...</p>; // You can customize this loading indicator
    }

    if (error) {
        return <p>Error: {error}</p>; // Display an error message
    }

    const { name, instructor, code } = courseInfo;

    return (

        <div className="course-card-container">
            <div className="course-card">
                <img src={image} alt={name} className="course-image" />
                <div className="course-details">
                    <h2 className="course-name">{name}</h2>
                    <p className="instructor-name">Course Code: {code}</p>
                    <p className="instructor-name">Department: {department}</p>
                    <p className="instructor-name">Instructor: {instructor}</p>
                    <p className="semester-offered">
                        Offered in semester: {OfferedInSemester}
                    </p>
                </div>
            </div>
            <div className="posts-section">
                <h3>Posts</h3>
                <PostList id='6580959b5a9f0bb827be6078' />
            </div>
        </div>
    );
};

export default CourseCard;
