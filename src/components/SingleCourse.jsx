import React from 'react';
import './SingleCourse.css'; // Import the external stylesheet
import PostList from './PostList';
import CourseCard from './CourseCard';
const SingleCourse = ({ id }) => {

    return (
        <div className="course-card-container">
            <CourseCard id={id} />
            <div className="posts-section">
                <h3>Posts</h3>
                <PostList id='6580959b5a9f0bb827be6078' />
            </div>
        </div>
    );
};

export default SingleCourse;
