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
        description: ''
    });
    const { name, instructor, code, description } = courseInfo;
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
                    <h1 className="main-heading">{name}</h1>
                    <h3 className='sub-heading'>{code}</h3>
                    <p className='det'>Instructor:<strong> {instructor}</strong></p>
                    <p className='det'>Description: <strong> {description}</strong></p>
                    <p className='det'>Overall Rating: <strong>3 Stars</strong></p>
                </div>
                <div className='mid-top'>
                    <h2>Ratings</h2>
                    {loading ? <p>Loading...</p> : <RatingCard stars={stars} length={length} />}
                </div>
                <div className='right-top'>
                    <button onClick={() => setRatingFormView(!ratingFormView)}>
                        {ratingFormView ? 'Close' : 'Rate Course'}
                    </button>
                    <div className={`slide-down ${ratingFormView ? 'open' : ''}`}>
                        <RatingForm course_id={id} />
                    </div>
                </div>
            </div>

            <div className='container-one-bot'>
                <div className='left-bot'>
                    <h3 className='bot-heading'>Material</h3>
                    <MaterialList id={id} />
                    {materialFormView ? <>
                        <button style={{ "margin-left": '16px' }} onClick={() => setMaterialFormView(!materialFormView)}>Close</button>
                        <br />
                        {
                            materialUploadFormView ?
                                <>
                                    <button style={{ "margin-left": '16px' }} onClick={() => setMaterialUploadFormView(!materialUploadFormView)}>Close Pdf Form</button>
                                    <div style={{ "margin-left": '16px' }}>
                                        <MaterialUploadForm course_id={id} />
                                    </div>
                                </> :
                                <button style={{ "margin-left": '16px' }} onClick={() => setMaterialUploadFormView(!materialUploadFormView)}>Upload Pdf</button>
                        }
                        <br />
                        {
                            materialLinkFormView ?
                                <>
                                    <button style={{ "margin-left": '16px' }} onClick={() => setMaterialLinkFormView(!materialLinkFormView)}>Close Link Form</button>
                                    <div style={{ "margin-left": '16px' }}>
                                        <MaterialLinkForm course_id={id} />
                                    </div>
                                </> :
                                <button style={{ "margin-left": '16px' }} onClick={() => setMaterialLinkFormView(!materialLinkFormView)}>Upload Link</button>
                        }

                    </> :
                        <button style={{ "margin-left": '16px' }} onClick={() => setMaterialFormView(!materialFormView)}>Upload Material</button>
                    }
                </div>
                <br />
                <div className='right-bot'>
                    <h3 className='bot-heading'>All Posts</h3>
                    <PostList id={id} />
                    <button style={{ "margin-left": '16px' }} onClick={() => setPostFormView(!postFormView)}>
                        {postFormView ? "Close" : "Add Post"}
                    </button>
                    <div style={{ "margin-left": '16px' }} className={`slide-down ${postFormView ? 'open' : ''}`}>
                        <PostForm course_id={id} />
                    </div>
                </div>
            </div>
        </div >

    );
};

export default SingleCourse;
