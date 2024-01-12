import React, { useState, useEffect } from 'react';
import './SingleCourse.css'; // Import the external stylesheet
import PostList from './PostList';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';
import MaterialLinkForm from './MaterialLinkForm';
import MaterialUploadForm from './MaterialUploadForm';
import MaterialList from './MaterialList';
import axios from 'axios';
import RatingCard from './RatingCard';
import RatingForm from './RatingForm'
import backgroundImage from "../assets/bgimj2.jpg";

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
    const [rating, setRating] = useState(null);
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
                setRating((stars[0] + stars[1] + stars[2] + stars[3] + stars[4]) / 5.0);
                setLength(response.data.ratings.length);
                setCourseInfo(response.data);
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        };
        fetchData(id)
    }, [id])
    return (
        <React.Fragment>
            <div className='container-zero'>
                {<div className="background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '600px', minHeight: '100vh', opacity: '1' }} />}
                <div className='container-one-top'>
                    <div className='left-top'>
                        <h1 className="main-heading"><strong>{name}</strong></h1>
                        <h3 className='sub-heading'>{code}</h3>
                        <p className='det'>Instructor:<strong> {instructor}</strong></p>
                        <p className='det'>Details: <strong style={{ textTransform: 'uppercase' }}> {description}</strong></p>
                        <p className='det'>Overall Rating: <strong>{rating == 0 || !rating ? 'Not Yet Rated' : rating}</strong></p>
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
                            <button style={{ "marginLeft": '16px' }} onClick={() => setMaterialFormView(!materialFormView)}>Close</button>
                            <br />
                            {
                                materialUploadFormView ?
                                    <>
                                        <button style={{ "marginLeft": '16px' }} onClick={() => setMaterialUploadFormView(!materialUploadFormView)}>Close Pdf Form</button>
                                        <div style={{ "marginLeft": '16px' }}>
                                            <MaterialUploadForm course_id={id} />
                                        </div>
                                    </> :
                                    <button style={{ "marginLeft": '16px' }} onClick={() => setMaterialUploadFormView(!materialUploadFormView)}>Upload Pdf</button>
                            }
                            <br />
                            {
                                materialLinkFormView ?
                                    <>
                                        <button style={{ "marginLeft": '16px' }} onClick={() => setMaterialLinkFormView(!materialLinkFormView)}>Close Link Form</button>
                                        <div style={{ "marginLeft": '16px' }}>
                                            <MaterialLinkForm course_id={id} />
                                        </div>
                                    </> :
                                    <button style={{ "marginLeft": '16px' }} onClick={() => setMaterialLinkFormView(!materialLinkFormView)}>Upload Link</button>
                            }

                        </> :
                            <button style={{ "marginLeft": '16px' }} onClick={() => setMaterialFormView(!materialFormView)}>Upload Material</button>
                        }
                    </div>
                    <br />
                    <div className='right-bot'>
                        <h3 className='bot-heading'>All Posts</h3>
                        <PostList id={id} />
                        <button style={{ "marginLeft": '16px' }} onClick={() => setPostFormView(!postFormView)}>
                            {postFormView ? "Close" : "Add Post"}
                        </button>
                        <div style={{ "marginLeft": '16px' }} className={`slide-down ${postFormView ? 'open' : ''}`}>
                            <PostForm course_id={id} />
                        </div>
                    </div>
                </div>
            </div >
        </React.Fragment>
    );
};

export default SingleCourse;
