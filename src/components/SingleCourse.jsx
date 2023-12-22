import React from 'react';
import './SingleCourse.css'; // Import the external stylesheet
import PostList from './PostList';
import CourseCard from './CourseCard';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';
const SingleCourse = () => {
    const { id } = useParams();
    return (
        <div className="course-card-container">
            <CourseCard id={id} linkDisable={true} />
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
