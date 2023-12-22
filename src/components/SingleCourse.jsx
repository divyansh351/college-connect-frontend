import React, { useState } from 'react';
import './SingleCourse.css'; // Import the external stylesheet
import PostList from './PostList';
import CourseCard from './CourseCard';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';
import MaterialLinkForm from './MaterialLinkForm';
import MaterialUploadForm from './MaterialUploadForm';
import MaterialList from './MaterialList';


const SingleCourse = () => {
    const { id } = useParams();
    const [materialFormView, setMaterialFormView] = useState(false);
    const [materialUploadFormView, setMaterialUploadFormView] = useState(false);
    const [materialLinkFormView, setMaterialLinkFormView] = useState(false);
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

            </div>
            <div className="posts-section">
                <h3>Add A New Post</h3>
                <PostForm course_id={id} />
                <h3>All Posts</h3>
                <PostList id={id} />
            </div>
        </div>
    );
};

export default SingleCourse;
