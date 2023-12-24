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
const SingleCourse = () => {
    const { id } = useParams();
    const [materialFormView, setMaterialFormView] = useState(false);
    const [materialUploadFormView, setMaterialUploadFormView] = useState(false);
    const [materialLinkFormView, setMaterialLinkFormView] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stars, setStars] = useState([]);
    const [length, setLength] = useState(0);
    useEffect(() => {
        const fetchData = async (id) => {
            try {
                setLoading(true);
                const response = await axios.get(`https://college-connect-backend-0x0i.onrender.com/course/${id}`);
                setStars(response.data.stars);
                setLength(response.data.ratings.length);
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
        <div className="course-card-container">
            <div>
                <CourseCard id={id} linkDisable={true} />
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
                <MaterialList id={id} />
                {loading ? <p>Loading...</p> : <RatingCard stars={stars} length={length} />}
                <RatingForm course_id={id} />
            </div>
            <div className="posts-section">
                <h3>Add A New Post</h3>
                <PostForm course_id={id} />
                <h3>All Posts</h3>
                <PostList id={id} />
            </div>
        </div >
    );
};

export default SingleCourse;
