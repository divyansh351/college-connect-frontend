import React, { useState, useEffect } from 'react';
import './SingleCourse.css'; // Import the external stylesheet
import PostList from './PostList';
import CourseCard from './CourseCard';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';
import MaterialLinkForm from './MaterialLinkForm';
import MaterialUploadForm from './MaterialUploadForm';
import MaterialList from './MaterialList';
import axios from 'axios';
import RatingCard from './RatingCard';
import RatingForm from './RatingForm'
import backgroundImage from "../assets/bgimg.svg";
const SingleCourse = () => {
    const { id } = useParams();
    const [materialFormView, setMaterialFormView] = useState(false);
    const [materialUploadFormView, setMaterialUploadFormView] = useState(false);
    const [materialLinkFormView, setMaterialLinkFormView] = useState(false);
    const [ratingFormView, setRatingFormView] = useState(false);
    const [postFormView, setPostFormView] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stars, setStars] = useState([]);
    const [length, setLength] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        id: '',
        name: '',
        instructor: '',
        code: '',
    });
    const image = 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/software_engineer.jpeg.jpg'
    const department = 'Computer Science'
    const OfferedInSemester = 'Winter'
    const { name, instructor, code } = courseInfo;
    useEffect(() => {
        const fetchData = async (id) => {
            try {
                setLoading(true);
                const response = await axios.get(`https://college-connect-backend-0x0i.onrender.com/course/${id}`);
                setStars(response.data.stars);
                setLength(response.data.ratings.length);
                setCourseInfo(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        };
        fetchData(id)
    }, [id])
    return (
        <div className='container-zero'>
            {/*<div className="background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', opacity: '0.8' }} />*/}
            <div className='container-one-top'>
                <div className='left-top'>
                    <h2 className="course-name">{name}</h2>
                    <p>Course Code: {code}</p>
                    <p>Department: {department}</p>
                    <p>Instructor: {instructor}</p>
                    <p>Offered in semester: {OfferedInSemester}</p>
                </div>
                <div className='right-top'>
                    {loading ? <p>Loading...</p> : <RatingCard stars={stars} length={length} />}
                    {
                        ratingFormView ?
                            <>
                                <button onClick={() => setRatingFormView(!ratingFormView)}>Close</button>
                                <RatingForm course_id={id} />
                            </> :
                            <button onClick={() => setRatingFormView(!ratingFormView)}>Rate Course</button>

                    }
                </div>
            </div>

            <div className='container-one-bot'>
                <div className='left-bot'>
                    <h3>Material</h3>
                    <MaterialList id={id} />
                    {materialFormView ? <>
                        <button onClick={() => setMaterialFormView(!materialFormView)}>Close</button>
                        {
                            materialUploadFormView ?
                                <>
                                    <button onClick={() => setMaterialUploadFormView(!materialUploadFormView)}>Close Pdf Form</button>
                                    <MaterialUploadForm course_id={id} />
                                </> :
                                <button onClick={() => setMaterialUploadFormView(!materialUploadFormView)}>Upload Pdf</button>
                        }
                        {
                            materialLinkFormView ?
                                <>
                                    <button onClick={() => setMaterialLinkFormView(!materialLinkFormView)}>Close Link Form</button>
                                    <MaterialLinkForm course_id={id} />
                                </> :
                                <button onClick={() => setMaterialLinkFormView(!materialLinkFormView)}>Upload Link</button>
                        }

                    </> :
                        <button onClick={() => setMaterialFormView(!materialFormView)}>Upload Material</button>
                    }
                </div>

                <div className='right-bot'>
                    <h3>All Posts</h3>
                    <PostList id={id} />
                    {
                        postFormView ?
                            <>
                                <h3>Add Post</h3>
                                <button onClick={() => setPostFormView(!postFormView)}>Close</button>
                                <PostForm course_id={id} />
                            </> :
                            <button onClick={() => setPostFormView(!postFormView)}>Add Post</button>

                    }
                </div>
            </div>
        </div >

    );
};

export default SingleCourse;
